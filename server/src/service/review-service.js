const ReviewModel = require('../models/review-model.js');
//const ApiError = require('../exceptions/api-error');

class Review {
    constructor(Author, PC, Text) {
        this.Author = Author; // ObjectId
        this.PC = PC; // ObjectId
        this.Text = Text; // string
        //this.Check = PC + " " + Author;// раньше использовал для ограничения 1 коммент на 1 сборку
    }
}

class ReviewService {
    async create(reviewData) {
        try {
            const review = await ReviewModel.create({...reviewData});

            return review;
        } catch (e) {
            console.error('ERROR reviewService create:', e);
            return null;
        }
    }

    async read() {
        try {
            const reviews = await ReviewModel.find(); 
            return reviews;
        } catch (e) {
            console.error('Error reading reviews:', e);
            return null;
        }
    }

    async readUserReviews(Author, page) {
        try {
            const reviews = await ReviewModel.find({ Author })
                .skip((page - 1) * 10) // пропускаем первые n элементов
                .limit(10); // ограничиваем количество возвращаемых элементов до m
            return reviews;
        } catch (e) {
            console.error('Error reading reviews:', e);
            return null;
        }
    }

    async readPcReviews(PC) {
        try {
            const reviews = await ReviewModel.find({PC}); 
            return reviews;
        } catch (e) {
            console.error('Error reading reviews:', e);
            return null;
        }
    }

    async update(Id, reviewData) {
        try {
            const updatedReview = await ReviewModel.findOneAndUpdate({ Id }, reviewData, { new: true }); // Находим и обновляем запись по имени
            return updatedReview;
        } catch (e) {
            console.error('Error updating review:', e);
            return null;
        }
    }

    async delete(Name) {
        try {
            console.log(Name);
            const deletedReview = await ReviewModel.findOneAndDelete({ Name }); // Находим и удаляем запись по имени
            
            return deletedReview;
        } catch (e) {
            console.error('Error deleting review:', e);
            return null;
        }
    }
}

module.exports = { ReviewService, Review };
