import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/navbar'
import Methods from '../components/methods'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Card, CardActions, CardContent, Typography, Button, Grid, TextField, Stack, CardHeader, Backdrop } from '@mui/material';
import { useRouter } from "next/router"
export default function Dashboard() {
    const router = useRouter()
    const [projectName, setProjectName] = useState();
    const [projectResponsible, setProjectResponsible] = useState();
    const [step, setStep] = useState(1);
    const [methodName, setMethodName] = useState("Selecione o método de valoração");
    const [calculated, setCalculated] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        sessionStorage.removeItem('calculatedMethod')
    }, [])
    useEffect(() => {
        var calculated = sessionStorage.getItem('calculatedMethod')
        if (step == 3 && !calculated) {
            alert("selecione um método")
            setStep(2)
        } else {
            setCalculated(calculated)
        }
    }, [step])

    async function signupProject() {
        setLoading(true)
        const response = await fetch("http://localhost:1337/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { name: projectName, responsible: projectResponsible, calculated: calculated, method: methodName } }),
        });
        const data = await response.json();
        console.log(data)
        if (data.error) {
            alert(data.error.message)
        }

        if (response) {
            setLoading(false)
        }
        if (response.status == 200) {
            alert('Cadastrado com sucesso!')
            router.push('/home')
        }

    }
    return (
        <>
            <Head>
                <title>
                    Cadastrar projeto
                </title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <div>
                <div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
                <Box Box sx={{ display: 'flex' }}>
                    <Nav />
                    <Box component="main" sx={{ flexGrow: 1, paddingLeft: '2%', paddingTop: '20%', paddingRight: '2%' }}>
                        <Grid>
                            <Grid container rowSpacing={3}>
                                <Grid item xs={12}>
                                    <Card>
                                        {step == 1 &&
                                            <CardContent>
                                                <Stack
                                                    component="form"
                                                    spacing={2}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        variant="filled"
                                                        placeholder="Nome da patente / Projeto / Aplicação"
                                                        onChange={(e) => { setProjectName(e.target.value) }}
                                                    />
                                                    <TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-normal"
                                                        placeholder="Responsável da patente"
                                                        variant="filled"
                                                        onChange={(e) => { setProjectResponsible(e.target.value) }}
                                                    />
                                                </Stack>
                                            </CardContent>
                                        }
                                        {step == 2 &&
                                            <CardContent>
                                                <CardHeader
                                                    title={methodName}
                                                    subheader=""
                                                />
                                                <Methods setStep={setStep} setMethodName={setMethodName} />
                                            </CardContent>
                                        }
                                        {step == 3 &&
                                            <CardContent>
                                                <CardHeader
                                                    title="Confirme os dados"
                                                    subheader="Validação"
                                                />
                                                <CardContent>
                                                    <Stack
                                                        component="form"
                                                        spacing={2}
                                                        noValidate
                                                        autoComplete="off"
                                                    >
                                                        <TextField
                                                            hiddenLabel
                                                            id="filled-hidden-label-small"
                                                            variant="filled"
                                                            value={projectName}
                                                            onChange={(e) => { setProjectName(e.target.value) }}
                                                        />
                                                        <TextField
                                                            hiddenLabel
                                                            id="filled-hidden-label-normal"
                                                            value={projectResponsible}
                                                            variant="filled"
                                                            onChange={(e) => { setProjectResponsible(e.target.value) }}
                                                        />
                                                        <TextField
                                                            disabled
                                                            id="filled-hidden-label-normal"
                                                            value={methodName}
                                                            variant="filled"
                                                        />
                                                        <TextField
                                                            disabled
                                                            id="filled-hidden-label-normal"
                                                            value={calculated}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                </CardContent>
                                            </CardContent>
                                        }
                                        <CardActions>
                                            <Button disabled={step == 1 || step == 3 ? true : false} onClick={() => { setStep(step - 1) }} size="small">Voltar</Button>
                                            {step == 3 ? <Button onClick={() => { projectName && signupProject() }} size="large" variant="contained">Confirmar</Button> : <Button onClick={() => { setStep(step + 1) }} size="small">Proximo</Button>}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>

        </>
    )
}