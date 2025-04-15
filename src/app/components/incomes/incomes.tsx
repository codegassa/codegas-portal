import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type {IncomesProps} from "./incomes.types"

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

function Title({children}: IncomesProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}


export default function Incomes() {
  return (
    <>
      <Title>Ganancias Dia</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        26 Marzo, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver Balance
        </Link>
      </div>
    </>
  );
}