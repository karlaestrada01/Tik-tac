/**
 * Author: Karla Estrada
 * Version: 1.0
 * Description: Tik-Tac is my personalized adaption of Tik tok.
 * Date: 10-03-2022
 */

import { feedData } from "./data.js";
import {commentorObj} from "./data.js";

let postContainer = document.getElementById("post-container")
const btnPrev = document.getElementById("btn-prev")
const btnNext = document.getElementById("btn-next")

let positionCount = 0;
let visibility;
const commentSection = document.getElementById("commentSection")

/**
 * Renders out the feed based on the post's attributes
 * 
 */
function renderFeed() {
    let str = ""
    let likedHeart = ""
    let savedIcon = "fa-regular"
    let sharedIcon = ""
    let commentsReplies = ""
    let copiedItem = "feedItem"

    for (let i = 0; i < feedData.length; i++) {

        let feedItem = feedData[i]
        
        if (i === positionCount) {
            visibility = `post-visible`
        }
        else {
            visibility = `post-hidden`
        }
        if (feedItem.isLiked) {
            likedHeart = "liked-heart"
        }
        else {
            likedHeart = ""
        }

        if (feedItem.isSaved) {
            savedIcon = "fa-solid"
        }
        else {
            savedIcon = "fa-regular"
        }
        
        if (feedItem.isShared) {
            sharedIcon = "shared-icon"
            copiedItem = `<p id="reply-message">Copied to clipboard!</p>`

        }
        else {
            sharedIcon = ""
            copiedItem = ""
        }


        commentsReplies = ``
        let count = 0;
        if (feedItem.comments.length > 0) {
            feedItem.comments.forEach(function (reply) {
                commentsReplies +=
                    `
                <div class="reply-container">
                    <div id="message-info">
                        <img src="${reply.commentorImg}"
                        <p>${reply.commentor}</p>
                    </div>
                    
                    <div id="message-container">
                        <p>${reply.message}</p>
                        
                       
                    </div>
                </div>
                
                `

            })
        }
        else {
            commentsReplies +=
                `
                <div id="no-message">
                        <p>No comments yet</p>
                        <form id="comment-form">
                            <input type="text" id="reply" name="reply" placeholder="Leave a comment...">
                            <button type="submit">Submit</button>
                        </form>
                </div>
                `

        }
        str +=
            `
            <div class="post-content ${visibility}" id="post-content">
                <div>
                    <img class="post-video" src=${feedItem.postedVid} alt=${feedItem.altImg}>
                

                </div>
                <div class="post-footer">
                    <img class="profile-pic" src="${feedItem.profilePic}">
                    <div>
                        <p>${feedItem.username}</p>
                        <p id="caption">${feedItem.caption}</p>
                    </div>
                </div>
                <div class="post-icons">
                    <span class="icon-container">
                    
                        <i class="fa-solid fa-heart ${likedHeart}" data-like='${feedItem.uuid}'></i>${feedItem.likes}
                    </span>
                    <span class="icon-container">
                        <i class="fa-solid fa-comment-dots" data-comment='${feedItem.uuid}'></i>${feedItem.comments.length}
                    </span>
                        
                    <span class="icon-container">
                        <i class=" fa-bookmark ${savedIcon}" data-bookmark='${feedItem.uuid}'></i>${feedItem.saves}
                    </span>
                    
                    <span class="icon-container">
                        <i class=" fa-solid fa-share ${sharedIcon} " data-save='${feedItem.uuid}'></i>${feedItem.shares}
                        
                    </span>
  
                </div>
                    ${copiedItem}
                <div class="commentSection hidden" id="comments-${feedItem.uuid}">
                    ${commentsReplies}
                </div>   
            </div>         
            `
        postContainer.innerHTML = str;  
    }
}

renderFeed();

const postArray = document.getElementsByClassName("post-content")
const postContent = document.getElementById("post-content")
/**
 * Removes visibility of each post
 */
function removeVisibility() {
    for (let post of postArray) {
        post.classList.remove("post-visible")
        post.classList.add("post-hidden")
    }
}
/**
 * Event listener when the next button is pressed
 */
btnNext.addEventListener("click", function () {
    removeVisibility();
    btnPrev.disabled = false;
    if (positionCount === postArray.length - 1) {
        positionCount = 0;
    }
    else {
        positionCount++;
    }
    postArray[positionCount].classList.add("post-visible")

})
/**
 * Event listener when the previous button is pressed
 */
btnPrev.addEventListener("click", function () {

    if (positionCount === 0) {
        btnPrev.disabled = true;
    }
    else {
        removeVisibility();
        positionCount--;
        postArray[positionCount].classList.add("post-visible");
    }
})

/**
 * Event listener for any of the icons
 * @param e 
 *      data set attrbute
 */
postContainer.addEventListener("click", function (e) {
    const targetDataSet = e.target.dataset;
    let datasetAttr = ""
    if (targetDataSet.like) {
        datasetAttr = "like"
        updateIcons(targetDataSet.like, datasetAttr)
    }
    else if (targetDataSet.comment) {
        datasetAttr = "comment"

        updateIcons(targetDataSet.comment, datasetAttr)
    }
    else if (targetDataSet.bookmark) {
        datasetAttr = "bookmark"
        updateIcons(targetDataSet.bookmark, datasetAttr)
    }
    else if (targetDataSet.save) {
        datasetAttr = "save"
        updateIcons(targetDataSet.save, datasetAttr)
    }
})

/**
 * Each icon is updated when pressed
 * @param {*} postID 
 *          the uuid of the post pressed
 * @param {*} datasetAttribute 
 *          the attribute that was pressed
 */
function updateIcons(postID, datasetAttribute) {

    const postObj = feedData.filter(function (post) {
        return post.uuid === postID
    })[0]
    if (datasetAttribute === "like") {

        if (postObj.isLiked) {
            postObj.likes--;
        }
        else {
            postObj.likes++;
        }
        postObj.isLiked = !postObj.isLiked
        renderFeed();
    }
    else if (datasetAttribute === "comment") {
        const commentForm = document.getElementById("comment-form")
        commentForm.addEventListener('submit', function(submitted){
            submitted.preventDefault()
            const commentFormData = new FormData(commentForm)
            const commentMessage = commentFormData.get("reply")
            commentorObj.message = commentMessage;
            postObj.comments.push(commentorObj)
            renderFeed();
        })
        document.getElementById(`comments-${postID}`).classList.toggle('hidden')    
    }
    else if (datasetAttribute === "bookmark") {
        if (postObj.isSaved) {
            postObj.saves--;
        }
        else {
            postObj.saves++;
        }
        postObj.isSaved = !postObj.isSaved
        renderFeed();
    }
    else {

        if (postObj.isShared) {
            postObj.shares--;
        }
        else {
            postObj.shares++;
            navigator.clipboard.writeText("https://spectacular-otter-0a59f8.netlify.app/")
        }
        postObj.isShared = !postObj.isShared
        renderFeed();
    }
    
}


