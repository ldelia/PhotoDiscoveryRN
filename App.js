import React from "react";
import {RecoilRoot} from 'recoil';
import Dashboard from "./Dashboard";

export default function App() {
    return (
        <RecoilRoot>
            <Dashboard/>
        </RecoilRoot>
    );
}

