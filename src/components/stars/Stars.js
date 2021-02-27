import React, { Component } from 'react'
import Rating from 'material-ui-rating'

export default class Stars extends Component{
    render() {
        if (!this.props.noHeader) {
            return (
                <div>
                    <h2>{this.props.rate}/5</h2>
                    <Rating
                        value={this.props.rate}
                        max={5}
                        readOnly={true}
                    />
                </div>
            )
        }
        return (
           
            <div>
                <Rating
                    value={this.props.rate}
                    max={5}
                    readOnly={true}
                />
            </div>
        )
    }
 }