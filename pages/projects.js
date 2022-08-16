import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/navbar'
import { Box, Card, CardActions, CardContent, Typography, Button, Grid } from '@mui/material';
import Table from '../components/projectTable'
export default function Projects() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:1337/api/projects')
            .then((res) => res.json())
            .then((data) => {
                setData(data.data)
                setLoading(false)
            })
    }, [])
    console.log(data)
    return (
        <>
            <Head>
                <title>
                    Projetos
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
                                    {loading ? <div>carregando..</div> : <Table rows={data}></Table>}
                                </Grid>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </div>

        </>
    )
}