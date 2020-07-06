import React from 'react';

const LinksList = ({ links }) => {
    if(links.length === 0) {
        return <p>There are no links yet</p>
    }


    return (
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Original</th>
                    <th>Shortened</th>
                    <th>Open</th>
                </tr>
            </thead>

            <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <a href={`/detail/${link._id}`} target="_blank">Open</a>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    )
}

export default LinksList;