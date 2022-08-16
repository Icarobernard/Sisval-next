import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardActions, CardContent, TextField, Stack, Button, Grid } from '@mui/material';


export default function CashFlow({ setStep }) {
    const [tax, setTax] = React.useState()
    const [years, setYears] = React.useState([])
    const [value, setValue] = React.useState()
    const [updateValue, setUpdatedValue] = React.useState(false)
    React.useEffect(() => {
        if (value) {
            var newArray = years
            newArray.push(value)
            setYears(newArray)
            setValue(0)
            setUpdatedValue(false)
        }
    }, [updateValue])

    const calculateMethod = () => {
        var value = 0;
        for (var i = 0; i < years.length; i++) {
            value = value + years[i] / (tax) ** (i + 1)
        }
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BRL',
        });

        var valor = formatter.format(value)
        console.log(valor)
        sessionStorage.setItem('calculatedMethod', valor)
        setStep(3)
    }

    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Stack
                                component="form"
                                spacing={2}
                                noValidate
                                autoComplete="off"
                            >
                                <Grid item xs={12}>
                                    <TextField value={tax}
                                        onChange={(e) => { setTax(parseFloat(e.target.value)) }}
                                        placeholder="Informe a taxa"
                                        type="number" />
                                </Grid>
                                <Grid item xs={12}>
                                    <label>Adicione o valor do fluxo de caixa para o ano</label>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField value={value}
                                        onChange={(e) => { setValue(parseFloat(e.target.value)) }}
                                        placeholder="Valor para o ano"
                                        type="number"
                                    />
                                    <Button
                                        onClick={() => { value ? setUpdatedValue(true) : alert("adicione um valor diferente de 0") }}
                                        size="small"
                                        variant="contained"
                                        color="success">
                                        Add + ano
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    {years.length > 0 && <Button variant="contained" onClick={() => { calculateMethod() }}> Calcular Fluxo</Button>}
                                </Grid>
                                <Grid item xs={12}>
                                    {years.map((value, index) => {
                                        return <><div>Período {index + 1}: {value}</div> <br></br></>
                                    })}
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}