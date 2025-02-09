# Dhanvantari

## File Structure

```
AI/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── components/
    │   ├── AssistantInterface.tsx
    │   ├── ChatInput.tsx
    │   ├── ChatMessage.tsx
    │   ├── DisclaimerModal.tsx
    │   ├── HomePage.tsx
    │   ├── LanguageSelector.tsx
    │   └── MedicineScanner.tsx
    ├── config/
    │   └── languages.ts
    └── lib/
        └── gemini.ts
```


AI-Powered Voice Assistant: A speech-based AI system that allows users to ask health-related questions in their local language and receive spoken responses with educational content on topics like hygiene, nutrition, maternal health, and common diseases.

### Prerequisites
- Node.js (version >= 16.0.0)
- npm (Node package manager)

### Commands to Run the Application
1. **Install Dependencies**: 
   ```bash
   npm install
   ```
2. **Run the Development Server**: 
   ```bash
   npm run dev
   ```
3. **Build the Application**: 
   ```bash
   npm run build
   ```
4. **Preview the Built Application**: 
   ```bash
   npm run preview
   ```

The system has three main components:
Speech Recognizer: Converts user’s spoken questions into text.
Built Using Gemini-1.5-flash AI model: Understands the question and finds the most relevant health information.
Text-to-Speech Converter: Converts the AI-generated response into speech and plays it back to the user.
Use Cases in Rural Healthcare Maternal Health: Pregnant women ask about diet, baby care, and prenatal checkups.
Common Illnesses: Farmers ask about fever, stomach pain, or infections.
Hygiene & Nutrition: Children and adults learn about sanitation, clean drinking water, and balanced diets.
