import React from 'react'

const Transaction = ({ transaction }) => {
    return (
        <div className="transaction">
            <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
                <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>{transaction.price}</div>
                <div className="datetime">{transaction.datetime}</div>
            </div>
        </div>
    )
}

export default Transaction