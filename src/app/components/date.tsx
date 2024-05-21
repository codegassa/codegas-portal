'use client' 
import React from 'react'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const Date = ({value, setValueDate, label}: any) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={['DatePicker']}>
            <DemoItem label={label} >
                <DatePicker value={value} onChange={(newValue) => setValueDate(newValue)} 
                    sx={{ 
                        width: "100%"
                    }}
                />
            </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    )
}