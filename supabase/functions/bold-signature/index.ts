import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const { orderId } = await req.json();
    if (typeof orderId !== "string" || !/^[0-9a-f-]{36}$/.test(orderId)) {
      return new Response(JSON.stringify({ error: "Orden inválida" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
    }
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: order, error } = await admin
      .from("orders").select("id,total,status,source").eq("id", orderId).maybeSingle();
    if (error || !order || order.source !== "web" || order.status !== "pending") {
      return new Response(JSON.stringify({ error: "Orden no encontrada" }), { status: 404, headers: { ...cors, "Content-Type": "application/json" } });
    }
    const amount = String(Math.round(Number(order.total)));
    const currency = "COP";
    const secret = Deno.env.get("BOLD_SECRET_KEY")!;
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${orderId}${amount}${currency}${secret}`));
    const signature = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
    return new Response(JSON.stringify({
      apiKey: Deno.env.get("BOLD_IDENTITY_KEY"), orderId, amount, currency, signature,
    }), { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (_e) {
    return new Response(JSON.stringify({ error: "Error" }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
