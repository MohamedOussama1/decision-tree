import React from 'react'
import * as ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import SurveyComponent from "./SurveyComponent.tsx";
import LoginComponent from "./LoginComponent.tsx";
import DataTableComponent from "./DataTableComponent.tsx";
import CreatePatientComponent from "./CreatePatientComponent.tsx";
import SurveyResultComponent from './SurveyResultComponent.tsx';
import UpdatePatientComponent from './UpdatePatientComponent.tsx';

const router = createBrowserRouter([
    {
        path: "/survey/:id",
        element: <SurveyComponent></SurveyComponent>,
    },
    {
        path: "/survey-result/:id",
        element: <SurveyResultComponent></SurveyResultComponent>,
    },
    {
        path: "/patients",
        element: <DataTableComponent></DataTableComponent>,
    },
    {
        path: "/createPatient",
        element: <CreatePatientComponent></CreatePatientComponent>,
    },
    {
        path: "/updatePatient/:id",
        element: <UpdatePatientComponent></UpdatePatientComponent>,
    },
    {
        path: "/login",
        element: <LoginComponent></LoginComponent>,
    },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

