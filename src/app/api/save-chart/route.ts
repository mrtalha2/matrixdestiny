import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { parseBirthDateSlug } from "@/lib/validations/birthdate";
import { calculateDestinyMatrix } from "@/lib/matrix-engine";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { SITE_URL, SITE_DOMAIN } from "@/lib/seo/structured-data";

const saveChartSchema = z.object({
  dateSlug: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  name: z.string().trim().max(60).optional().nullable(),
  email: z.string().trim().email("Invalid email address").optional().nullable().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedInput = saveChartSchema.safeParse(body);

    if (!parsedInput.success) {
      return NextResponse.json(
        { success: false, error: parsedInput.error.issues[0]?.message || "Invalid payload" },
        { status: 400 }
      );
    }

    const { dateSlug, name, email } = parsedInput.data;
    const dateParts = parseBirthDateSlug(dateSlug);

    if (!dateParts) {
      return NextResponse.json(
        { success: false, error: "Invalid calendar date provided" },
        { status: 400 }
      );
    }

    const { day, month, year } = dateParts;
    const matrix = calculateDestinyMatrix({ day, month, year });
    const centerPoint = matrix.points.find((p) => p.id === "comfortZone") || matrix.points[0];
    const centerArcana = arcanaMeanings[centerPoint.value] || arcanaMeanings[1];
    const karmicStr = matrix.karmicTail.points.join(" - ");

    // 1. Transactional email dispatch via Resend (stateless calculation, zero DB persistence)
    let emailSent = false;
    let devNotice: string | undefined;

    const targetEmail = email && email.trim() ? email.trim() : null;

    if (targetEmail) {
      const apiKey = process.env.RESEND_API_KEY;
      const isPlaceholderKey =
        !apiKey ||
        apiKey.includes("placeholder") ||
        apiKey === "re_placeholder_replace_with_your_key";

      if (isPlaceholderKey) {
        devNotice =
          "Email skipped: RESEND_API_KEY is currently a placeholder in .env.local. Add your real key from https://resend.com/api-keys to send real emails.";
      } else {
        try {
          const resend = new Resend(apiKey);
          const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

          const formattedDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          const chartUrl = `${SITE_URL}/chart/${dateSlug}${
            name ? `?name=${encodeURIComponent(name)}` : ""
          }`;

          await resend.emails.send({
            from: `Matrix of Destiny <${fromEmail}>`,
            to: targetEmail,
            subject: `Your Destiny Matrix Chart — ${formattedDate}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1C1A17; margin: 0; padding: 32px 16px; }
                    .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 1px solid #EAE4DC; border-radius: 16px; padding: 36px 32px; box-shadow: 0 4px 12px rgba(28, 26, 23, 0.05); }
                    .header { text-align: center; border-bottom: 1px solid #EAE4DC; padding-bottom: 24px; margin-bottom: 28px; }
                    .logo { font-size: 20px; font-weight: 700; color: #C25E3E; letter-spacing: 1px; text-transform: uppercase; }
                    .title { font-size: 24px; color: #1C1A17; margin-top: 12px; margin-bottom: 6px; }
                    .badge { display: inline-block; padding: 4px 12px; background: rgba(194, 94, 62, 0.1); color: #C25E3E; border-radius: 20px; font-size: 13px; font-weight: 600; margin-top: 6px; }
                    .card { background: #F4F0EA; border: 1px solid #EAE4DC; border-radius: 12px; padding: 20px; margin: 24px 0; }
                    .highlight-row { display: flex; justify-content: space-between; margin-bottom: 12px; }
                    .btn { display: inline-block; width: 100%; box-sizing: border-box; text-align: center; background-color: #C25E3E; color: #FFFFFF !important; padding: 14px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; margin-top: 20px; }
                    .footer { text-align: center; font-size: 12px; color: #857D73; margin-top: 32px; line-height: 1.6; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <div class="logo">Matrix of Destiny</div>
                      <h1 class="title">${name ? `${name}&rsquo;s Personal Blueprint` : "Your Destiny Matrix"}</h1>
                      <span class="badge">${formattedDate}</span>
                    </div>

                    <p style="font-size: 14px; line-height: 1.6; color: #524C44;">
                      Hello${name ? ` ${name}` : ""},
                    </p>
                    <p style="font-size: 14px; line-height: 1.6; color: #524C44;">
                      Your personal 22-energy Destiny Matrix chart has been computed and securely archived. Here is your executive blueprint summary:
                    </p>

                    <div class="card">
                      <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Soul Comfort Zone:</strong> Energy ${centerPoint.value} &mdash; ${centerArcana.name} (<em>${centerArcana.archetype}</em>)</p>
                      <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Core Sanctuary:</strong> ${centerArcana.essence}</p>
                      <p style="margin: 0; font-size: 14px;"><strong>Karmic Tail Triad:</strong> ${karmicStr}</p>
                    </div>

                    <a href="${chartUrl}" class="btn">View Full Interactive Octagram Chart</a>

                    <div class="footer">
                      <p>You received this email because you saved your chart on <a href="${SITE_URL}" style="color: #C25E3E;">${SITE_DOMAIN}</a>.</p>
                      <p>Matrix of Destiny is an architectural self-reflection numerology tool offered solely for personal insight.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          });
          emailSent = true;
        } catch (mailErr) {
          console.error("Resend dispatch error:", mailErr);
          devNotice = `Email dispatch attempted but failed: ${mailErr instanceof Error ? mailErr.message : "Unknown error"}`;
        }
      }
    }

    return NextResponse.json({
      success: true,
      emailSent,
      devNotice,
      dateSlug,
    });
  } catch (err) {
    console.error("Save chart API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error saving chart" },
      { status: 500 }
    );
  }
}
