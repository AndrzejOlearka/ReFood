import React, { Component } from 'react'
import './content.css'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ButtonSubmit from '../MUI/ButtonSubmit';
import UserContext from "../../context/UserContext"
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

export default class CommentForm extends Component{

    static contextType = UserContext

    constructor(props) {
        super(props);

        this.setComment = this.setComment.bind(this);
        this.addComment = this.addComment.bind(this);

        this.state = {
            comment: '',
            parent_comment: '',
            user: null,
            recipe: null,
        }
    }

    setComment(e){
        this.setState({
            comment: e.target.value
        })
    }

    addComment(){
        const commentRecipeLink = this.props.region+'/recipe/'+this.props.match.params.id+'/comment';
        axios.post("http://localhost:5000/"+commentRecipeLink, {
                comment: this.state.comment,
                user: this.context.userData.user.id,
                parent_comment: null,
            }, 
            {headers: {"x-auth-token":this.context.userData.token}}
        ).then(response => {
            if(response.data)
                if(response.data._id){
                    this.props.rerenderParentCallback();
                }
        }).catch(error => {
            console.log(error);
        })
    }

    render(){

        return (
            <main className="gridContainer">
                <Grid container spacing={2}>
                    <Grid item xs={false} md={2} lg={3}></Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <Box px={4} className="gridContent">
                            <h3>Add Comment</h3>
                            <TextareaAutosize rowsMin={4} className="commentTextarea" value={this.state.comment} onChange={this.setComment}/>
                            <ButtonSubmit variant="contained" color="primary" onClick={this.addComment}>Add Comment</ButtonSubmit>
                        </Box>
                    </Grid>
                    <Grid item xs={false} md={2} lg={3}></Grid>
                </Grid>
            </main>
        )
    }
}
