import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PredictionForm from "./components/PredictionForm";
import ResultPanel from "./components/ResultPanel";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";
import { predictRoomType } from "./api/predictService";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [lastInput, setLastInput] = useState(null);
  const formSectionRef = useRef(null);
  const resultRef = useRef(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (payload) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await predictRoomType(payload);
      setResult(data);
      setLastInput(payload);
      toast.success(`Predicted: ${data.predicted_room_type}`);
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      toast.error(err.message || "Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: theme === "dark" ? "#151D26" : "#ffffff",
            color: theme === "dark" ? "#F4F1EA" : "#0A0E13",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
          },
          success: { iconTheme: { primary: "#7ED957", secondary: "#0A0E13" } },
          error: { iconTheme: { primary: "#F25C54", secondary: "#0A0E13" } },
        }}
      />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1">
        <Hero onStart={scrollToForm} />

        <section ref={formSectionRef} className="max-w-3xl mx-auto px-6 py-10 scroll-mt-24">
          <PredictionForm onSubmit={handleSubmit} loading={loading} />
        </section>

        <section ref={resultRef} className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
          <ResultPanel result={result} lastInput={lastInput} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
