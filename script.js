function openPostModal() {
    document
        .getElementById("postModal")
        .classList.add("active");
}

function closePostModal() {
    document
        .getElementById("postModal")
        .classList.remove("active");
}

function openModal() {
    document
        .getElementById("loginModal")
        .classList.add("active");
}

function closeModal() {
    document
        .getElementById("loginModal")
        .classList.remove("active");
}


    /* =========================
       LIKE POST
    ========================= */

    function likePost(button) {

        const count =
            button.querySelector("span");

        let number =
            parseInt(count.innerText);

        if (!button.classList.contains("liked")) {

            number++;

            button.classList.add("liked");

            button.firstChild.textContent = "♥ ";

        } else {

            number--;

            button.classList.remove("liked");

            button.firstChild.textContent = "♡ ";

        }

        count.innerText = number;
    }


    /* =========================
       COMMENTS
    ========================= */

    function toggleComments(button) {

        const post =
            button.closest(".post");

        const comments =
            post.querySelector(".comments");

        comments.classList.toggle("show");
    }


    /* =========================
       CREATE POST
    ========================= */

    function createPost() {

        const title =
            document.getElementById("postTitle")
            .value.trim();

        const text =
            document.getElementById("postText")
            .value.trim();

        const anonymous =
            document.getElementById("anonymousCheck")
            .checked;

        if (!title || !text) {

            alert(
                "Please add a title and share a little about what's on your mind."
            );

            return;
        }


        const username =
            anonymous
            ? "anonymous"
            : "community_member";


        const post = document.createElement("article");

        post.className = "post";

        post.innerHTML = `

            <div class="post-header">

                <div class="avatar">
                    🌱
                </div>

                <div>

                    <div class="username">
                        ${username}
                    </div>

                    <div class="time">
                        just now
                    </div>

                </div>

                <span class="tag">
                    Community
                </span>

            </div>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p class="post-content">
                ${escapeHTML(text)}
            </p>

            <div class="post-actions">

                <button
                    class="action"
                    onclick="likePost(this)">
                    ♡ <span>0</span>
                </button>

                <button
                    class="action"
                    onclick="toggleComments(this)">
                    💬 0
                </button>

                <button class="action">
                    🔖 Save
                </button>

            </div>

            <div class="comments">

                <div class="comment-input">

                    <input
                        placeholder="Write a supportive comment..."
                    >

                    <button class="btn btn-primary">
                        Post
                    </button>

                </div>

            </div>
        `;


        const main =
            document.querySelector(
                ".community-layout main"
            );

        const createPostBox =
            document.querySelector(".create-post");

        main.insertBefore(
            post,
            createPostBox.nextElementSibling
        );


        document.getElementById("postTitle").value = "";
        document.getElementById("postText").value = "";

        closePostModal();

        document
            .getElementById("community")
            .scrollIntoView({
                behavior: "smooth"
            });
    }


    /* =========================
       SEARCH
    ========================= */

    function searchPosts() {

        const query =
            document.getElementById("searchInput")
            .value
            .toLowerCase();

        const posts =
            document.querySelectorAll(".post");

        posts.forEach(post => {

            const text =
                post.innerText.toLowerCase();

            if (text.includes(query)) {
                post.style.display = "";
            } else {
                post.style.display = "none";
            }

        });
    }


    /* =========================
       FEELINGS
    ========================= */

    function selectFeeling(feeling) {

        const messages = {

            "Happy":
                "That's lovely. Want to share what made today feel good? 🌱",

            "Sad":
                "It's okay to have difficult days. You don't have to hide them. 💚",

            "Anxious":
                "Take a slow breath. You don't need to solve everything right now. 🌿",

            "Lonely":
                "You're here, and there are people who understand. You don't have to carry everything alone. 🫂",

            "Angry":
                "Your feelings are valid. Maybe writing it out can help make sense of what's underneath. 🌱",

            "Lost":
                "You don't need to know the entire path. Sometimes the next small step is enough. 🕊️",

            "Hopeful":
                "Hold onto that feeling. Even a little hope can be a beginning. 🌱"
        };


        document.getElementById(
            "feelingResult"
        ).innerText = messages[feeling];
    }


    /* =========================
       SECURITY
    ========================= */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    /* =========================
       CLOSE MODAL ON BACKDROP
    ========================= */

    window.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                document.getElementById("postModal")
            ) {
                closePostModal();
            }

            if (
                event.target ===
                document.getElementById("loginModal")
            ) {
                closeModal();
            }

        }
    );
