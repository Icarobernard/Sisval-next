import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardActions, CardContent, TextField, Stack, Button, Grid, FormControl, Select, InputLabel, MenuItem } from '@mui/material';


export default function Royalty({ setStep }) {
    const [tax, setTax] = React.useState()
    const [sectorTax, setSectorTax] = React.useState({ minimum: "", medium: "", maximum: "" })
    const [value, setValue] = React.useState()
    const [updateValue, setUpdatedValue] = React.useState(false)
    const [periods, setPeriods] = React.useState([])

    React.useEffect(() => {
        if (value && tax) {
            var newArray = periods
            newArray.push(value * tax / 100)
            setPeriods(newArray)
            setValue(0)
            setTax(0)
            setUpdatedValue(false)
        }
    }, [updateValue])

    // var formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'BRL',
    // });

    // var valor = formatter.format(value)

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
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Setor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={age}
                                            label="Selecione o setor:"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={"Telecomunicações"} onClick={() => { setSectorTax({ minimum: "0,4%", medium: "4,7%", maximum: "25%" }) }} >Telecomunicações</MenuItem>
                                            <MenuItem value={"Softwares"} onClick={() => { setSectorTax({ minimum: "0%", medium: "6,8%", maximum: "70%" }) }}>Softwares</MenuItem>
                                            <MenuItem value={"Semicondutores"} onClick={() => { setSectorTax({ minimum: "0%", medium: "3,2%", maximum: "30%" }) }}>Semicondutores</MenuItem>
                                            <MenuItem value={"Fármacos e Biotecnologia"} onClick={() => { setSectorTax({ minimum: "0,1%", medium: "5,1%", maximum: "40%" }) }}>Fármacos e Biotecnologia</MenuItem>
                                            <MenuItem value={"Mídia e entretenimento"} onClick={() => { setSectorTax({ minimum: "2%", medium: "8%", maximum: "50%" }) }}>Mídia e entretenimento</MenuItem>
                                            <MenuItem value={"Máquinas e ferramentas"} onClick={() => { setSectorTax({ minimum: "0,5%", medium: "4,5%", maximum: "25%" }) }}>Máquinas e ferramentas</MenuItem>
                                            <MenuItem value={"Internet"} onClick={() => { setSectorTax({ minimum: "0,3%", medium: "7,5%", maximum: "40%" }) }}>Internet</MenuItem>
                                            <MenuItem value={"Produtos para saúde"} onClick={() => { setSectorTax({ minimum: "0,1%", medium: "4,8%", maximum: "77%" }) }}>Produtos para saúde</MenuItem>
                                            <MenuItem value={"Alimentos"} onClick={() => { setSectorTax({ minimum: "0,3%", medium: "2,8%", maximum: "7%" }) }}>Alimentos</MenuItem>
                                            <MenuItem value={"Energia e entretenimento"} onClick={() => { setSectorTax({ minimum: "0,5%", medium: "5%", maximum: "20%" }) }}>Energia e entretenimento</MenuItem>
                                            <MenuItem value={"Eletrônicos"} onClick={() => { setSectorTax({ minimum: "0,5%", medium: "4%", maximum: "15%" }) }}>Eletrônicos</MenuItem>
                                            <MenuItem value={"Bens de consumo"} onClick={() => { setSectorTax({ minimum: "0%", medium: "5%", maximum: "17%" }) }}>Bens de consumo</MenuItem>
                                            <MenuItem value={"Computadores"} onClick={() => { setSectorTax({ minimum: "0,2%", medium: "4%", maximum: "15%" }) }}>Computadores</MenuItem>
                                            <MenuItem value={"Automotivo"} onClick={() => { setSectorTax({ minimum: "1%", medium: "4%", maximum: "15%" }) }}>Automotivo</MenuItem>
                                            <MenuItem value={"Químicos"} onClick={() => { setSectorTax({ minimum: "0,5%", medium: "3,6%", maximum: "25%" }) }}>Químicos</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField value={tax}
                                            onChange={(e) => { setTax(parseFloat(e.target.value)) }}
                                            placeholder="Informe a taxa"
                                            type="number" />
                                    </FormControl>
                                    {sectorTax.minimum != "" &&
                                        <>
                                            <label>A taxa de royality mínima é de: {sectorTax.minimum}</label>
                                            <br></br>
                                            <label>máxima: {sectorTax.maximum}</label>
                                            <br></br>
                                            <label>mediana: {sectorTax.medium}</label>
                                        </>}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField value={value}
                                            onChange={(e) => { setValue(parseFloat(e.target.value)) }}
                                            placeholder="Valor Líquido"
                                            type="number"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button color="success" onClick={() => { setUpdatedValue(true) }} variant="contained"> Adicionar período </Button>
                                    <Button onClick={() => { Calculated() }} variant="contained"> Finalizar cálculo royalty</Button>
                                </Grid>
                                {periods.length > 0 && periods.map((value, index) => {
                                    return <> Periodo {index + 1}: {value} <br></br></>
                                })}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}