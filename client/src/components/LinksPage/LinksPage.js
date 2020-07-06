import React, { Fragment, useState, useEffect, useContext, useCallback } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext.js';
import Loader from '../Loader';
import LinksList from '../LinksList';

const LinksPage = (props) => {
    const [links, setLinks] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched);
        } catch(e) {

        }
    }, [token, request])

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks])


    if(loading) {
        return <Loader />
    }

    return (
        <Fragment>
            {!loading && <LinksList links={links} />}
        </Fragment>
    )
}


export default LinksPage;