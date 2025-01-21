import React from "react";
import ParticleMorphing from "./ParticleMorphing";
// import ParticleMorphing from "./OldParticleMorph";
import "./App.css";

const App = () => {
    return (
        <div className="app">
            <div
                className="section"
                style={{ height: "100vh", backgroundColor: "#111" }}
                id="section1"
            >
                <h1
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        paddingTop: "40vh",
                    }}
                >
                    Scroll Down to Morph
                </h1>
            </div>
            <ParticleMorphing />
            <div
                className="section"
                style={{ height: "100vh", backgroundColor: "#000" }}
                id="empty-section1"
            ></div>
            <div
                className="section"
                style={{ height: "100vh", backgroundColor: "#222" }}
                id="section2"
            >
                <h1
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        paddingTop: "40vh",
                    }}
                >
                    You've Reached the End!
                </h1>
            </div>
            <div
                className="section"
                style={{ height: "100vh", backgroundColor: "#000" }}
                id="empty-section2"
            ></div>
            <div
                className="section"
                style={{ height: "100vh", backgroundColor: "#333" }}
                id="section3"
            >
                <h1
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        paddingTop: "40vh",
                    }}
                >
                    Enjoy the Final Morph!
                </h1>
            </div>
        </div>
    );
};

export default App;
