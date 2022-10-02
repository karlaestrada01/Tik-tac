import { feedData } from "./data.js";

let postContainer = document.getElementById("post-container")
const btnPrev = document.getElementById("btn-prev")
const btnNext = document.getElementById("btn-next")

let positionCount = 0;
let visibility;
const commentSection = document.getElementById("commentSection")
function renderFeed() {
    let str = ""
    let likedHeart = ""
    let savedIcon = "fa-regular"
    let sharedIcon = ""
    let commentsReplies = ""
    for (let i = 0; i < feedData.length; i++) {

        visibility = `post-hidden`
        if (i === positionCount) {
            visibility = `post-visible`
        }
        if (feedData[i].isLiked) {
            likedHeart = "liked-heart"
        }

        if (feedData[i].isSaved) {
            savedIcon = "fa-solid"
        }
        if (feedData[i].isShared) {
            sharedIcon = "shared-icon"
        }


        commentsReplies = ``

        if (feedData[i].comments.length > 0) {
            feedData[i].comments.forEach(function (reply) {
                commentsReplies +=
                    `
                <p>no comments</p>
                <h1>IDLK BRUH</h1>
                `

            })
        }
        else {
            commentsReplies +=
                `
                <p>no commenfdkadsfts</p>
                <h1>IDLK BRfkdsahfdlUH</h1>
                `

        }
        str +=
            `
            <div class="post-content ${visibility}" id="post-content">
                <div>
                    <img class="post-video" src="${feedData[i].postedVid}">
                

                </div>
                <div class="post-footer">
                    <img class="profile-pic" src="${feedData[i].profilePic}">
                    <p>${feedData[i].caption}</p>
                </div>
                <div class="post-icons">
                    <span class="icon-container">
                    
                        <i class="fa-solid fa-heart ${likedHeart}" data-like='${feedData[i].uuid}'></i>${feedData[i].likes}
                    </span>
                    <span class="icon-container">
                        <i class="fa-solid fa-comment-dots" data-comment='${feedData[i].uuid}'></i>${feedData[i].comments.length}
                    </span>
                        
                    <span class="icon-container">
                        <i class=" fa-bookmark ${savedIcon}" data-bookmark='${feedData[i].uuid}'></i>${feedData[i].saves}
                    </span>
                    
                    <span class="icon-container">
                        <i class=" fa-solid fa-share ${sharedIcon} " data-save='${feedData[i].uuid}'></i>${feedData[i].shares}
                    </span>


                    
                </div>
                <div class="commentSection hidden" id="comments-${feedData[i].uuid}">
                ${commentsReplies}
                </div>
            
                
                 
            </div>
           
            `



        postContainer.innerHTML = str;

        // const commentSection =  document.getElementById("commentSection")
        // let postComments=``
        // if(feedData[i].comments > 0){

        // }
        // else {
        //     postComments  = `
        //     <p>no comments</p>
        //     <h1>IDLK BRUH</h1>`

        // }
        // commentSection.innerHTML = postComments
    }
    //return str;
}

function render() {
    postContainer.innerHTML = renderFeed();
}
renderFeed();
const postArray = document.getElementsByClassName("post-content");

const postContent = document.getElementById("post-content")
function removeVisibility() {
    for (let post of postArray) {
        post.classList.remove("post-visible")
        post.classList.add("post-hidden")
    }
}

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

postContainer.addEventListener("click", function (e) {

    let datasetAttr = ""
    if (e.target.dataset.like) {
        console.log("like")
        datasetAttr = "like"
        updateIcons(e.target.dataset.like, datasetAttr)
    }
    else if (e.target.dataset.comment) {
        console.log("comment")
        datasetAttr = "comment"

        updateIcons(e.target.dataset.comment, datasetAttr)
    }
    else if (e.target.dataset.bookmark) {
        console.log("bookamrk")
        datasetAttr = "bookmark"
        updateIcons(e.target.dataset.bookmark, datasetAttr)
    }
    else if (e.target.dataset.save) {
        console.log("save")
        datasetAttr = "save"
        updateIcons(e.target.dataset.save, datasetAttr)
    }
})


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
    }
    else if (datasetAttribute === "comment") {
        //removeCommentVisibility();
        //const commentSec = document.getElementById("commentSection")

        //commentArray[positionCount].classList.add("comment-visible");
        console.log(`comment-${postID}`)
        document.getElementById(`comments-${postID}`).classList.toggle('hidden')

    }
    else if (datasetAttribute === "bookmark") {
        if (postObj.isSaved) {
            postObj.saves--;
        }
        else {
            postObj.saves++;
        }
        console.log("in here")
        postObj.isSaved = !postObj.isSaved
    }
    else {

        if (postObj.isShared) {
            postObj.shares--;
        }
        else {
            postObj.shares++;
        }
        postObj.isShared = !postObj.isShared
    }
   // renderFeed();
}

console.log(document.getElementsByClassName("post-content"))
