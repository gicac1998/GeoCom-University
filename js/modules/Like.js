import $ from 'jquery';

class Like {
	constructor(){
		this.events();
	}

	events(){
		$('.like-box').on('click', this.ourClickDispatcher.bind(this));
	}

	//methods
	ourClickDispatcher(e){
		var currentLikeBox = $(e.target).closest('.like-box');
		//whatever element got clicked, find its closest parent or grandparent that matches this selector.

		if (currentLikeBox.attr('data-exists') == 'yes') {
			this.deleteLike(currentLikeBox);
		} else {
			this.createLike(currentLikeBox);
		}
	}

	createLike(currentLikeBox){
		$.ajax({
			// Trustly nonce code
			beforeSend: (xhr) => {
				xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
			},
			data: {'professorId': currentLikeBox.data('professor')},
			url: universityData.root_url + '/wp-json/university/v1/like',
			type: 'POST',
			success: (response) => {
				currentLikeBox.attr('data-exists', 'yes');
				var likeCount = parseInt(currentLikeBox.find('.like-count').html(), 10);
				likeCount++;
				currentLikeBox.find('.like-count').html(likeCount);
				currentLikeBox.attr("data-like", response);
				console.log(response);
			},
			error: (response) => {
				console.log(response);
			}
		});
	}

	deleteLike(currentLikeBox){
		$.ajax({
			// Trustly nonce code
			beforeSend: (xhr) => {
				xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
			},
			url: universityData.root_url + '/wp-json/university/v1/like',
			data: {'like': currentLikeBox.attr('data-like')},
			type: 'DELETE',
			success: (response) => {
				currentLikeBox.attr('data-exists', 'no');
				var likeCount = parseInt(currentLikeBox.find('.like-count').html(), 10);
				likeCount--;
				currentLikeBox.find('.like-count').html(likeCount);
				currentLikeBox.attr("data-like", '');
				console.log(response);
			},
			error: (response) => {
				console.log(response);
			}
		});
	}
}


export default Like;