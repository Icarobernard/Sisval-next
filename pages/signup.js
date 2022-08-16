import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, Grid, TextField, Button, CardMedia, Backdrop } from '@mui/material'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import MenuBook from '@mui/icons-material/MenuBook'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import Head from "next/head"
import Link from "next/link"
import styles from "./index.module.css"

export default function Signup() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [mailConfirmed, setMailConfirmed] = React.useState(false)
    const [formValidate, setFormValidate] = React.useState(false)
    const [message, setMessage] = React.useState(null)
    const [signed, setSigned] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    useEffect(() => {
        if (password == "" || username == "") {
            setFormValidate(true)
        } else {
            setFormValidate(false)
        }
    }, [username, password])

    async function SignupRequest() {
        setLoading(true)
        const response = await fetch("http://localhost:1337/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password, email: email }),
        });
        const data = await response.json();
        if (data.error) {
            setMessage(data.error.message)
        }
        console.log(data)
        if (response) {
            setLoading(false)
        }
        if (data) {
            setSigned(true)
            setMessage(`Seu cadastro foi enviado e está em análise, seja muito bem-vindo(a) ao Sisval!.`)
        }
    }

    return (
        <div>
            <Head>
                <title>Cadastrar</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
                className={styles.signupContainer}
            >
                <div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 500 }}>
                        <CardHeader
                            avatar={
                                <MenuBook aria-label="recipe">
                                </MenuBook>
                            }

                            title="Cadastro"
                        />
                        {signed ?
                            <>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Oláa {username}!
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        {message}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'center', marginBottom: '5%' }}>
                                    <Link href="/">
                                        <Button startIcon={<EmojiEmotionsIcon />} size="large" variant="contained" color="secondary">Continuar</Button>
                                    </Link>
                                </CardActions>
                                <CardMedia
                                    component="img"
                                    height="520"
                                    width="520"
                                    image="/graph.gif"
                                    alt="bear gif"
                                />
                            </>
                            :
                            <>
                                <CardContent>
                                    <div style={{ display: 'grid', justifyContent: 'center' }}>
                                        <TextField className={styles.marginForm} onChange={(e) => { setEmail(e.target.value) }} type="email" id="outlined-basic" label="Email address" variant="outlined" />
                                        <br></br>
                                        {mailConfirmed &&
                                            <>
                                                <TextField className={styles.marginForm} onChange={(e) => { setUsername(e.target.value) }} type="text" id="outlined-basic" label="username" variant="outlined" />
                                                <br></br>
                                                <TextField className={styles.marginForm} onChange={(e) => { setPassword(e.target.value) }} type="password" id="outlined-basic" label="Password" variant="outlined" />
                                            </>
                                        }
                                    </div>
                                </CardContent>
                                {message && <CardActions style={{ justifyContent: 'center' }} disableSpacing>
                                    <Typography variant="body2" color="red">
                                        {message}
                                    </Typography>
                                </CardActions>}
                                <CardActions style={{ justifyContent: 'center' }} disableSpacing={false}>
                                    <Button disabled={!mailConfirmed ? false : formValidate} variant="contained" onClick={() => { !mailConfirmed ? setMailConfirmed(true) : SignupRequest() }}>Continue</Button>
                                    <Link href="/">
                                        <Button variant="outlined">Voltar</Button>
                                    </Link>
                                </CardActions>
                                <CardActions style={{ justifyContent: 'center' }} disableSpacing>
                                    <Typography variant="body2" color="text.secondary">
                                        Já tem uma conta? <Link href="/"><a style={{ color: 'blue' }}>Login</a></Link>
                                    </Typography>
                                </CardActions>
                            </>
                        }
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
