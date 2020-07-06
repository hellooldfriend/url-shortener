import React, { Fragment } from 'react';

const LinkCard = ({ link }) => {
    return (
        <Fragment>
            <h2>Link</h2>
            <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks: {link.clicks}</p>
            <p>Date created: {new Date(link.date).toLocaleDateString()}</p>
        </Fragment>
    )
}

export default LinkCard