import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/navbar'
import { Box, Card, CardActions, CardContent, Typography, Button, Grid } from '@mui/material';
export default function Dashboard() {
    const [username, setUsername] = useState();
    useEffect(() => {
        const storage = JSON.parse(sessionStorage.getItem('data'))
        setUsername(storage?.user.username)
    }, [])
    return (
        <>
            <Head>
                <title>
                    Home
                </title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <div>
                <Box Box sx={{ display: 'flex' }}>
                    <Nav />

                    <Box component="main" sx={{ flexGrow: 1, paddingLeft: '2%', paddingTop: '8%', paddingRight: '2%' }}>
                        <Grid>
                            <Grid container rowSpacing={3}>
                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Bem-vindo(a) {username}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Cadastre um novo projeto e escolha o método de valoração que deseja para este.
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link href="/signupProject">
                                                <Button size="small">Cadastrar</Button>
                                            </Link>
                                            <Button size="small">Visualizar</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card>
                                        {/* <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Bem-vindo(a) {username}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Share</Button>
                                            <Button size="small">Learn More</Button>
                                        </CardActions> */}
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