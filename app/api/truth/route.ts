import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/truth
 *
 * Proxies comprehension-challenge requests to the Anthropic API so the
 * browser never sees the API key.  Expects the same body shape as the
 * Anthropic Messages API ({ model, max_tokens, messages }).
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // No key configured — the client will use its fallback
    return NextResponse.json(
      { error: "Anthropic API key not configured" },
      { status: 503 },
    );
  }

  try {
    const body = await req.json();

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: body.model || "claude-sonnet-4-20250514",
        max_tokens: body.max_tokens || 1024,
        messages: body.messages,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `Anthropic API error: ${res.status}`, details: errorText },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to proxy request", details: String(err) },
      { status: 500 },
    );
  }
}
