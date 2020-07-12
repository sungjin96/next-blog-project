import React from "react";

export const themes = {
    light: {
        type: 'light',
        foreground: '#000000',
        fontColor: '#2b2c38',
        background: '#f4f7f9',
    },
    dark: {
       type: 'dark',
       foreground: '#ffffff',
        fontColor: '#dcdcdc',
       background: '#2b2c38'
    }
}

export const ThemeContext = React.createContext({});