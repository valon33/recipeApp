import React, { useEffect, useState } from "react";

const Alert = () => {
    const [time, setTime] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(0);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return <div>{time > 0 && <h1>hello</h1>}</div>;
};

export default Alert;
