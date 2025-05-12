'use client' 
import React from 'react'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

dayjs.extend(utc);

export const Date = ({value, setValueDate, label}: any) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="YYYY-MM-DD"
            label={label}
            value={value ? dayjs.utc(value) : null}
            onChange={(newValue) => {
              if (newValue) {
                setValueDate(newValue.format("YYYY-MM-DD"));
              }
            }}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                sx: {
                  backgroundColor: '#f5f5f566',
                  borderRadius: 2,
                  fontSize: 8,
                  height: 35,
                  minWidth: 90,
                  '& .MuiInputBase-root': {
                    fontSize: '0.85rem',
                    height: 35,
                    padding: '1px 5px',    // 🔽 Menos padding
                  }}}}}
          />
        </LocalizationProvider>
    )
}