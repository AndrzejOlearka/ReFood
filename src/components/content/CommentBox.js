import React, { Component } from 'react'
import './content.css'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Moment from 'react-moment';
import Stars from "../stars/Stars";

export default class CommentBox extends Component{

    constructor(props) {
        super(props);

        this.state = {
            comment: {}
        }
    }

    render(){
        return (
            <main className="gridContainer">
                <Grid container spacing={2}>
                    <Grid item xs={false} md={2} lg={3}></Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <Box px={4} className="gridContent">
                            <h4>
                                {this.props.comment.user.username} 
                                <em><Moment format="YYYY-MM-DD HH:mm">{this.props.comment.date}</Moment></em>
                                <Stars noHeader={true} rate={this.props.userRate}/>
                            </h4>
                            <TextareaAutosize rowsMin={4} readOnly className="commentTextarea" value={this.props.comment.comment}/>
                        </Box>
                    </Grid>
                    <Grid item xs={false} md={2} lg={3}></Grid>
                </Grid>
            </main>
        )
    }
}
