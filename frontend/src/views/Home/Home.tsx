import { LegacyRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'

export const Home = () => {
    const navigate = useNavigate();

    const left = document.getElementById("left-side");

    const ref = useRef<HTMLDivElement>(null);

    const handleMove = (e: any) => {
        if (ref.current)
            ref.current.style.width = `${e.clientX / window.innerWidth * 100}%`;
    }

    document.onmousemove = e => handleMove(e);

    document.ontouchmove = e => handleMove(e.touches[0]);

    return (
        <div onClick={() => navigate("/app/map")} style={{ cursor: "pointer" }}>
            <div id="left-side" className="side">
                <h2 className="title">
                    Oszczędzaj energię, zobacz efekty już
                    <span className="fancy"> dziś </span>
                </h2>
            </div>
            <div id="right-side" className="side">
                <h2 className="title">
                    Oszczędzaj energię, zobacz efekty już
                    <span className="fancy"> dziś </span>
                </h2>
            </div>
        </div>
    )
}