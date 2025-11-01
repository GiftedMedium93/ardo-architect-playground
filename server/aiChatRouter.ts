import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// AI Partner personality prompts
const AI_PERSONALITIES: Record<string, string> = {
  zaha: "You are Zaha Hadid, the legendary parametric architect. You speak with passion about fluid, organic forms and cutting-edge parametric design. Your responses are bold, visionary, and emphasize innovation in form and space.",
  norman: "You are Norman Foster, the high-tech sustainable architecture pioneer. You focus on energy efficiency, green building practices, and integrating technology with timeless design. Your tone is professional, precise, and forward-thinking.",
  frank: "You are Frank Lloyd Wright, the master of organic architecture. You emphasize harmony with nature, horizontal lines, and integration of buildings with their surroundings. Your tone is philosophical and deeply connected to natural principles.",
  modernist: "You are a Modernist architect who champions clean lines, minimalism, and 'form follows function'. You value simplicity, efficiency, and the honest expression of materials.",
  structuralist: "You are a Structuralist engineer-architect who prioritizes structural integrity and engineering excellence. You discuss load-bearing systems, material properties, and innovative structural solutions.",
  urbanist: "You are an Urban Planner focused on city-scale design, public spaces, and community-centered architecture. You think about walkability, mixed-use development, and urban density.",
  traditionalist: "You are a Classical architect who values timeless proportions, historical precedents, and traditional craftsmanship. You reference classical orders and time-tested design principles.",
  futurist: "You are a Futurist architect exploring cutting-edge concepts like smart cities, AI-integrated buildings, and speculative design. You're excited about emerging technologies and radical new forms.",
  minimalist: "You are a Minimalist who believes 'less is more'. You focus on essential elements, negative space, and the power of restraint in design.",
  maximalist: "You are a Maximalist who celebrates bold colors, rich ornamentation, and layered complexity. You believe in the power of abundance and visual richness.",
  regionalist: "You are a Regionalist who emphasizes local materials, vernacular traditions, and culturally-appropriate design. You adapt architecture to specific climates and cultural contexts.",
  experimentalist: "You are an Experimental architect pushing boundaries with unconventional forms, materials, and construction methods. You challenge conventions and explore new possibilities.",
  pragmatist: "You are a Pragmatic architect focused on practical, cost-effective solutions that work. You balance aesthetics with budget, constructability, and client needs.",
  visionary: "You are a Visionary architect who thinks conceptually about the future of architecture. You explore big ideas, philosophical questions, and the social impact of design.",
};

export const aiChatRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        partnerId: z.string(),
        message: z.string(),
        conversationHistory: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { partnerId, message, conversationHistory } = input;

      if (!OPENROUTER_API_KEY) {
        // Fallback to simulated response if no API key
        return {
          response: generateSimulatedResponse(partnerId, message),
          isSimulated: true,
        };
      }

      try {
        const systemPrompt = AI_PERSONALITIES[partnerId] || AI_PERSONALITIES.modernist;

        const response = await fetch(OPENROUTER_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://ardo.manus.space",
            "X-Title": "ARDO Architect Playground",
          },
          body: JSON.stringify({
            model: "anthropic/claude-3.5-sonnet",
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              ...conversationHistory,
              {
                role: "user",
                content: message,
              },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (!response.ok) {
          throw new Error(`OpenRouter API error: ${response.statusText}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content || "I apologize, I couldn't generate a response.";

        return {
          response: aiResponse,
          isSimulated: false,
        };
      } catch (error) {
        console.error("AI Chat error:", error);
        // Fallback to simulated response on error
        return {
          response: generateSimulatedResponse(partnerId, message),
          isSimulated: true,
        };
      }
    }),
});

function generateSimulatedResponse(partnerId: string, message: string): string {
  const responses: Record<string, string[]> = {
    zaha: [
      "I envision fluid, parametric forms that challenge conventional geometry. Let's explore how we can create dynamic spaces that flow organically.",
      "The future of architecture lies in embracing complexity and creating forms that respond to their environment. What scale are we working with?",
      "Think beyond the box - literally. Parametric design allows us to create structures that were impossible just decades ago.",
    ],
    norman: [
      "Sustainability must be at the core of every design decision. How can we integrate passive solar strategies here?",
      "Let's focus on energy efficiency and long-term performance. What's the building's orientation and climate zone?",
      "High-tech doesn't mean complicated - it means smart, efficient, and responsive to environmental conditions.",
    ],
    frank: [
      "Architecture should be in harmony with its natural surroundings. How does this design respond to the landscape?",
      "Horizontal lines create a sense of shelter and connection to the earth. Let's emphasize that relationship.",
      "Every building should grow from its site as naturally as a tree grows from the soil.",
    ],
  };

  const partnerResponses = responses[partnerId] || [
    "That's an interesting architectural challenge. Let me share my perspective on this design problem.",
    "I'd approach this by considering the fundamental principles of good design: form, function, and context.",
    "Let's think about how this solution serves both aesthetic and practical needs.",
  ];

  return partnerResponses[Math.floor(Math.random() * partnerResponses.length)];
}

