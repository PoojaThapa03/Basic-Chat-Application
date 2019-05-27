import React, { Component } from 'react';
import './ChatHistory.css';

class ChatHistory extends Component {
    componentDidMount() {
        this.props.subscribeToNewMessage();
    }

    render() {
        const { error, loading, data } = this.props;
        const loggedUser = this.props.currentUser;
        if (error) return <p>Something went wrong</p>
        if (loading) return <p>loading....</p>
        return (
            <table>
                <tbody>
                    {data.chats.map(obj =>
                        <tr key={obj.created_at} >{
                            loggedUser === obj.sender ?
                                <td className="messageRight">{obj.message}
                                    {obj.created_at ? <div style={{ fontSize: " x-small" }}>{new Date(Number(obj.created_at)).toLocaleString()}</div> : null}
                                </td> :

                                <td key={obj.created_at} className="messageLeft"><div>{obj.message}</div>
                                    {obj.created_at ? <div style={{ fontSize: " x-small" }}>{new Date(Number(obj.created_at)).toLocaleString()}</div> : null}
                                </td>

                        }</tr>

                    )}
                </tbody>
            </table>
        )
    }
}

export default ChatHistory;