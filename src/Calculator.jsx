import React, { useState } from "react";
import "./Calculator.css";

const OPS = ["+", "-", "*", "/"];
const OP_LABEL = { "+": "+", "-": "−", "*": "×", "/": "÷" };

const compute = (a, b, op) => {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? NaN : a / b;
        default: return b;
    }
};

// Trim floating point noise and keep the display readable
const format = (n) => {
    if (!Number.isFinite(n)) return "Error";
    const s = String(parseFloat(n.toPrecision(12)));
    return s.length > 14 ? n.toExponential(6) : s;
};

const Calculator = () => {
    const [display, setDisplay] = useState("0");
    const [acc, setAcc] = useState(null);        // stored left operand
    const [op, setOp] = useState(null);          // pending operator
    const [fresh, setFresh] = useState(true);    // next digit starts a new number
    const [expr, setExpr] = useState("");        // small history line

    const isError = display === "Error";

    const clear = () => {
        setDisplay("0"); setAcc(null); setOp(null); setFresh(true); setExpr("");
    };

    const inputDigit = (d) => {
        if (isError) { clear(); }
        if (fresh || isError) {
            setDisplay(d);
            setFresh(false);
        } else {
            if (display.replace(/[-.]/g, "").length >= 14) return;
            setDisplay(display === "0" ? d : display + d);
        }
    };

    const inputDot = () => {
        if (fresh || isError) { setDisplay("0."); setFresh(false); setExpr(isError ? "" : expr); return; }
        if (!display.includes(".")) setDisplay(display + ".");
    };

    const del = () => {
        if (fresh || isError) return;
        const next = display.length > 1 ? display.slice(0, -1) : "0";
        setDisplay(next === "-" ? "0" : next);
    };

    const toggleSign = () => {
        if (isError || display === "0") return;
        setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
    };

    const percent = () => {
        if (isError) return;
        setDisplay(format(parseFloat(display) / 100));
        setFresh(true);
    };

    const chooseOp = (nextOp) => {
        if (isError) return;
        const current = parseFloat(display);
        if (acc !== null && op && !fresh) {
            const result = compute(acc, current, op);
            setAcc(result);
            setDisplay(format(result));
            if (!Number.isFinite(result)) { setOp(null); setAcc(null); setExpr(""); setFresh(true); return; }
            setExpr(`${format(result)} ${OP_LABEL[nextOp]}`);
        } else {
            setAcc(current);
            setExpr(`${format(current)} ${OP_LABEL[nextOp]}`);
        }
        setOp(nextOp);
        setFresh(true);
    };

    const equals = () => {
        if (isError || acc === null || !op) return;
        const current = parseFloat(display);
        const result = compute(acc, current, op);
        setExpr(`${format(acc)} ${OP_LABEL[op]} ${format(current)} =`);
        setDisplay(format(result));
        setAcc(null);
        setOp(null);
        setFresh(true);
    };

    const handleKeyDown = (e) => {
        const k = e.key;
        if (/^[0-9]$/.test(k)) inputDigit(k);
        else if (k === ".") inputDot();
        else if (OPS.includes(k)) chooseOp(k);
        else if (k === "Enter" || k === "=") { e.preventDefault(); equals(); }
        else if (k === "Backspace") del();
        else if (k === "Escape" || k.toLowerCase() === "c") clear();
        else if (k === "%") percent();
        else return;
    };

    const opBtn = (o) => (
        <button
            className={`btn-operator ${op === o && fresh ? "active" : ""}`}
            onClick={() => chooseOp(o)}
        >
            {OP_LABEL[o]}
        </button>
    );

    return (
        <div className="calculator" tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="display-wrap">
                <div className="display-expr">{expr || "\u00A0"}</div>
                <div className={`display ${display.length > 10 ? "small" : ""}`}>{display}</div>
            </div>

            <div className="calc-buttons">
                <button className="btn-fn btn-clear" onClick={clear}>C</button>
                <button className="btn-fn" onClick={del}>⌫</button>
                <button className="btn-fn" onClick={percent}>%</button>
                {opBtn("/")}

                <button className="btn-num" onClick={() => inputDigit("7")}>7</button>
                <button className="btn-num" onClick={() => inputDigit("8")}>8</button>
                <button className="btn-num" onClick={() => inputDigit("9")}>9</button>
                {opBtn("*")}

                <button className="btn-num" onClick={() => inputDigit("4")}>4</button>
                <button className="btn-num" onClick={() => inputDigit("5")}>5</button>
                <button className="btn-num" onClick={() => inputDigit("6")}>6</button>
                {opBtn("-")}

                <button className="btn-num" onClick={() => inputDigit("1")}>1</button>
                <button className="btn-num" onClick={() => inputDigit("2")}>2</button>
                <button className="btn-num" onClick={() => inputDigit("3")}>3</button>
                {opBtn("+")}

                <button className="btn-num" onClick={toggleSign}>±</button>
                <button className="btn-num" onClick={() => inputDigit("0")}>0</button>
                <button className="btn-num btn-dot" onClick={inputDot}>.</button>
                <button className="btn-equals" onClick={equals}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
