import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';


const CreatePage = (props) => {
    const history = useHistory()
    const auth = useContext(AuthContext);
    const [link, setLink] = useState('');
    const { request } =  useHttp();

    const handleKeyPress = async e => {
        if(e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="link">Add link</label>
                        </td>
                        <td>
                            <input
                                id="link"
                                type="text"
                                value={link}
                                placeholder={'Add link'}
                                name="email"
                                onChange={e => setLink(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CreatePage