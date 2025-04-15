'use client' 
import React from 'react'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BorderColor } from '@mui/icons-material';

dayjs.extend(utc);

export const Date = ({value, setValueDate, label}: any) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <DemoItem label={label} >
                <DatePicker
            format="YYYY-MM-DD"
            value={value ? dayjs.utc(value) : null}
            onChange={(newValue) => {
              if (newValue) {
                setValueDate(newValue.format("YYYY-MM-DD"));
              }
            }}
            sx={{ width: "100%"}}
          />
            </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    )
}