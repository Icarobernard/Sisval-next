import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Grid, TextField, Button, CardMedia, Typography, Backdrop } from '@mui/material'
import MenuBook from '@mui/icons-material/MenuBook'
import CircularProgress from '@mui/material/CircularProgress'
import Head from "next/head"
import Link from "next/link"
import styles from "./index.module.css"
import { useRouter } from "next/router"
export default function Login() {
  const router = useRouter()
  const [password, setPassword] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [formValidate, setFormValidate] = React.useState(false)
  const [message, setMessage] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    if (password == "" || email == "") {
      setFormValidate(true)
    } else {
      setFormValidate(false)
    }
  }, [email, password])

  async function Login() {
    setLoading(true)
    const response = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password: password }),
    });
    const data = await response.json();
    console.log(data)
    if (data.error) {
      setMessage(data.error.message)
    }

    if (response) {
      setLoading(false)
    }
    if (response.status == 200) {
      sessionStorage.setItem('data', JSON.stringify(data))
      router.push('/home')
    }

  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/book.png" />
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
                <img src={"/logo.png"} height="30px" width="20px" />
              }

              title="Login Sisval"
              subheader=""
            />
            <>
              <CardContent>
                <div style={{ display: 'grid', justifyContent: 'center' }}>
                  <TextField style={{ marginBottom: '9px' }} onChange={(e) => { setEmail(e.target.value) }} type="email" id="outlined-basic" label="Email address" variant="outlined" />
                  <TextField onChange={(e) => { setPassword(e.target.value) }} type="password" id="outlined-basic" label="Password" variant="outlined" />
                </div>
              </CardContent>
              {message && <CardActions style={{ justifyContent: 'center' }} disableSpacing>
                <Typography variant="body2" color="red">
                  {message}
                </Typography>
              </CardActions>}
              <CardActions style={{ justifyContent: 'center' }} disableSpacing={false}>
                <Button loading disabled={formValidate} variant="contained" onClick={() => { Login() }}>Continue</Button>
              </CardActions>
              <CardActions style={{ justifyContent: 'center' }} disableSpacing>
                <Typography variant="body2" color="text.secondary">
                  Não tem uma conta? <Link href="/signup"><a style={{ color: 'blue' }}>Cadastrar</a></Link>
                </Typography>
              </CardActions>
            </>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
