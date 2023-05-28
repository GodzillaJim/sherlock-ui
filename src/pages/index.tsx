import React, {useEffect} from "react";
import {useRouter} from "next/router";

const HomePage = (): JSX.Element => {
    const router = useRouter()

    useEffect(() => {
        router.push('/app').then()
    })
    return <></>
};

export default HomePage;
