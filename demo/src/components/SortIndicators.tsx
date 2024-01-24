import React from "react"

export const SortAsc = React.memo(() => {
    return <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--primary)" opacity=".7" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d="M15 13.5L12.3003 10.8003V10.8003C12.1344 10.6344 11.8656 10.6344 11.6997 10.8003V10.8003L9 13.5" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
})

export const SortDesc = React.memo(() => {
    return <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--primary)" opacity=".7" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d="M9.5 10.5L12.1997 13.1997V13.1997C12.3656 13.3656 12.6344 13.3656 12.8003 13.1997V13.1997L15.5 10.5" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
})
export const Neutral = React.memo(() => {
    return <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--primary)" opacity=".7" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 10H15" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 14H15" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
})

