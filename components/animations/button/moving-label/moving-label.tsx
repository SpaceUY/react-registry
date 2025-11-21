"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Spinner } from "@/registry/new-york/ui/spinner";
import "./styles.css";

const buttonCopy: Record<string, string | React.ReactNode> = {
  idle: "Send me a login link",
  loading: <Spinner />,
  success: "Login link sent!",
};

export default function SmoothButton() {
  const [buttonState, setButtonState] = useState("idle");

  return (
    <div className="outer-wrapper">
      <button
        className="blue-button"
        disabled={buttonState === "loading"}
        onClick={() => {
          if (buttonState === "success") return;

          setButtonState("loading");

          setTimeout(() => {
            setButtonState("success");
          }, 1750);

          setTimeout(() => {
            setButtonState("idle");
          }, 3500);
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            key={buttonState}
          >
            {buttonCopy[buttonState]}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
