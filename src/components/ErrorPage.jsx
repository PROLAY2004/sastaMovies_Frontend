import { Link } from "react-router-dom";

const ErrorPage = () => {
    const theme =
        document.documentElement.getAttribute("data-theme") || "dark";

    const colors =
        theme === "light"
            ? {
                bg: "#ffffff",
                stripe: "rgba(67,72,102,0.12)",
                c1: "rgb(67,72,102)",
                c2: "rgb(213,94,74)",
                c3: "rgb(221,189,142)",
            }
            : {
                bg: "rgb(10,12,22)",
                stripe: "rgba(148,171,163,0.12)",
                c1: "rgb(24,28,44)",
                c2: "rgb(164,60,52)",
                c3: "rgb(170,138,94)",
            };

    return (
        <>
            <style>
                {`
                @keyframes drift {
                    to {
                        background-position: 20px 20px;
                    }
                }

                @keyframes panelIn {
                    from {
                        opacity: 0;
                        transform: translateY(1.5rem);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>

            <div
                className="d-flex justify-content-center align-items-center min-vh-100 p-3"
                style={{
                    backgroundColor: colors.bg,
                    backgroundImage: `repeating-linear-gradient(
                        -45deg,
                        ${colors.stripe} 0,
                        ${colors.stripe} 1px,
                        transparent 0,
                        transparent 50%
                    )`,
                    backgroundSize: "20px 20px",
                    animation: "drift 8s linear infinite",
                }}
            >
                <div
                    className="text-center"
                    style={{
                        maxWidth: "460px",
                        width: "100%",
                        background: colors.c1,
                        border: `5px solid ${colors.c2}`,
                        padding: "3rem 2.5rem",
                        animation: "panelIn .5s .3s ease-out both",
                    }}
                >
                    <h1
                        className="fw-bold mb-1"
                        style={{
                            color: colors.c3,
                            fontSize: "clamp(5rem,20vw,9rem)",
                            lineHeight: 1,
                            textShadow: `4px 4px 0 ${colors.c2}`,
                        }}
                    >
                        404
                    </h1>

                    <p
                        className="fw-bold text-uppercase mb-3"
                        style={{
                            color: colors.c3,
                            letterSpacing: ".08em",
                        }}
                    >
                        Page Not Found
                    </p>

                    <p
                        className="mb-4"
                        style={{
                            color: colors.c3,
                            lineHeight: 1.6,
                        }}
                    >
                        The page you're looking for doesn't exist or may have
                        been moved.
                    </p>

                    <Link
                        to="/"
                        className="btn fw-bold text-uppercase"
                        style={{
                            background: colors.c3,
                            color: colors.c1,
                            border: `3px solid ${colors.c2}`,
                            letterSpacing: ".08em",
                            padding: ".75rem 2.5rem",
                            transition: "all .15s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `4px 4px 0 ${colors.c2}`;
                            e.currentTarget.style.transform =
                                "translate(-2px,-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.transform = "translate(0,0)";
                        }}
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;