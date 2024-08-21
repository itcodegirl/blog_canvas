// Sample placeholder for backend (can be replaced with API calls)
let posts = [
	{ postId: '1', title: 'Draft Post 1', content: 'This is a draft.', author: 'Admin', status: 'draft' },
	{ postId: '2', title: 'Published Post 1', content: 'This is published.', author: 'Admin', status: 'published' }
];

const adminForm = document.getElementById('admin-post-form');
const draftsList = document.getElementById('admin-drafts-list');
const publishedList = document.getElementById('admin-published-list');
const postPreviewModal = document.getElementById('post-preview-modal');

// Load Posts into Drafts and Published lists
function loadAdminPosts() {
	draftsList.innerHTML = '';
	publishedList.innerHTML = '';

	posts.forEach(post => {
		const postItem = document.createElement('div');
		postItem.classList.add('admin-post-item');
		postItem.textContent = post.title;
		postItem.addEventListener('click', () => loadPostForEditing(post));

		if (post.status === 'draft') {
			draftsList.appendChild(postItem); // Add to Drafts
		} else {
			publishedList.appendChild(postItem); // Add to Published
		}
	});
}

// Load selected post into the form for editing
function loadPostForEditing(post) {
	document.getElementById('post-id').value = post.postId;
	document.getElementById('post-title').value = post.title;
	document.getElementById('post-content').value = post.content;
	document.getElementById('post-author').value = post.author;
	document.querySelector(`input[name="post-status"][value="${post.status}"]`).checked = true;

	document.getElementById('delete-post').style.display = 'inline-block';
}

// Save or Update Post
adminForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const postId = document.getElementById('post-id').value || new Date().toISOString();
	const title = document.getElementById('post-title').value;
	const content = document.getElementById('post-content').value;
	const author = document.getElementById('post-author').value;
	const status = document.querySelector('input[name="post-status"]:checked').value;

	const postData = { postId, title, content, author, status };

	// Check if editing existing post
	const existingPostIndex = posts.findIndex(p => p.postId === postId);
	if (existingPostIndex !== -1) {
		posts[existingPostIndex] = postData;
	} else {
		posts.push(postData);
	}

	alert(status === 'published' ? 'Post published successfully!' : 'Post saved as draft!');
	adminForm.reset();
	loadAdminPosts();
});

// Delete Post
document.getElementById('delete-post').addEventListener('click', function () {
	const postId = document.getElementById('post-id').value;
	posts = posts.filter(post => post.postId !== postId);
	adminForm.reset();
	loadAdminPosts();
});

// Preview Post
document.getElementById('preview-post').addEventListener('click', function () {
	const title = document.getElementById('post-title').value;
	const content = document.getElementById('post-content').value;
	const author = document.getElementById('post-author').value;

	document.getElementById('preview-title').textContent = title;
	document.getElementById('preview-content').textContent = content;
	document.getElementById('preview-author').textContent = author;

	postPreviewModal.style.display = 'flex';
});

// Close Preview Modal
document.getElementById('close-preview').addEventListener('click', function () {
	postPreviewModal.style.display = 'none';
});

// Load posts on page load
loadAdminPosts();
