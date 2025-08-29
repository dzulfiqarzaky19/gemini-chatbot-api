export const extractGeminiResponse = ({ response }) => {
  try {
    const firstResponse =
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    const secondResponse = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    const thirdResponse = response?.response?.candidates?.[0]?.content?.text;

    console.log({ firstResponse, secondResponse, thirdResponse });

    return (
      firstResponse ||
      secondResponse ||
      thirdResponse ||
      JSON.stringify(response, null, 2)
    );
  } catch (error) {
    console.error("Error extracting Gemini response:", error);

    return JSON.stringify(response, null, 2);
  }
};
