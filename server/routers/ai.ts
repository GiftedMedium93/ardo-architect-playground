import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";

export const aiRouter = router({
  identifyMaterial: protectedProcedure
    .input(
      z.object({
        imageData: z.string(),
        category: z.enum(["color", "stone", "plant"]),
      })
    )
    .mutation(async ({ input }) => {
      const { imageData, category } = input;

      // Extract base64 data from data URL
      const base64Data = imageData.split(",")[1] || imageData;

      // Prepare the prompt based on category
      const prompts = {
        color: `Analyze this image and identify:
1. Primary colors (with hex codes)
2. Texture type (smooth, rough, woven, etc.)
3. If it's a fabric, identify the fabric type
4. Material composition
5. Architectural applications

Provide a detailed analysis in JSON format with: primaryMaterial, category, confidence (0-100), description, properties (array of {label, value}), alternatives (array of {name, confidence}), and recommendations (array of strings).`,
        
        stone: `Analyze this image and identify:
1. Material type (stone, wood, metal, concrete, etc.)
2. Specific variety (e.g., marble, granite, oak, steel)
3. Finish type (polished, matte, brushed, etc.)
4. Color and pattern
5. Architectural applications

Provide a detailed analysis in JSON format with: primaryMaterial, category, confidence (0-100), description, properties (array of {label, value}), alternatives (array of {name, confidence}), and recommendations (array of strings).`,
        
        plant: `Analyze this image and identify:
1. Organism type (plant, animal, fungi)
2. Species or common name
3. Characteristics
4. Growth requirements
5. Architectural and landscape applications

Provide a detailed analysis in JSON format with: primaryMaterial, category, confidence (0-100), description, properties (array of {label, value}), alternatives (array of {name, confidence}), and recommendations (array of strings).`,
      };

      try {
        // Call OpenRouter API with vision model
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.VITE_APP_URL || "http://localhost:3000",
            "X-Title": "ARDO Architect Playground",
          },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: prompts[category],
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: imageData.startsWith("data:") ? imageData : `data:image/jpeg;base64,${base64Data}`,
                    },
                  },
                ],
              },
            ],
            temperature: 0.3,
            max_tokens: 2000,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to analyze image");
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (!content) {
          throw new Error("No response from AI");
        }

        // Try to parse JSON from the response
        let result;
        try {
          // Extract JSON from markdown code blocks if present
          const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
          const jsonString = jsonMatch ? jsonMatch[1] : content;
          result = JSON.parse(jsonString);
        } catch (parseError) {
          // If parsing fails, create a structured response from the text
          result = {
            primaryMaterial: "Analysis Complete",
            category: category === "color" ? "Color/Texture/Fabric" : category === "stone" ? "Stone/Wood/Metal" : "Plant/Animal/Fungi",
            confidence: 85,
            description: content,
            properties: [],
            alternatives: [],
            recommendations: ["Review the detailed analysis above for architectural applications"],
          };
        }

        return result;
      } catch (error: any) {
        console.error("Material identification error:", error);
        throw new Error(error.message || "Failed to identify material");
      }
    }),
});

