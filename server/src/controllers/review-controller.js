const {ReviewService, Review} = require('../service/review-service');
const reviewService = new ReviewService();

class ReviewController{
    async createReview(req, res, next){
        try{
            const {Author, PC, Text} = req.body;
            //console.log(Author, PC, Text);
            //Валидация полей?
            const newReview = await reviewService.create(new Review(Author, PC, Text));

            return res.json(newReview);
        }
        catch(e){
            next(e);
        }
    }

    async getReviews(req, res, next){
        try{
            const Reviews = await reviewService.read();
            return res.json(Reviews);
        }
        catch(e){
            next(e);
        }
    }

    async getUserReviews(req, res, next){
        const {user, page} = req.params;
        console.log(user, page)
        try{
            if(page){
                const Reviews = await reviewService.readUserReviews(user, page);
                return res.json(Reviews);
            }
            else{
                const Reviews = await reviewService.readUserReviews(user);
                return res.json(Reviews);
            }
        }
        catch(e){
            next(e);
        }
    }

    async getPcReviews(req, res, next){
        const {id} = req.params;
        console.log(id)
        try{
            const Reviews = await reviewService.readPcReviews(id);
            return res.json(Reviews);
        }
        catch(e){
            next(e);
        }
    }

    async updateReview(req, res, next){
        try{
            const {NewName, Name, Brand, Socket, Cores, Threads, CoreClock, TurboBoost} = req.body;
            
            const updateReview = await reviewService.update(Name, new Review(NewName, Brand, Socket, Cores, Threads, CoreClock, TurboBoost));

            return res.json(updateReview);
        }
        catch(e){
            next(e);
        }
    }

    async deleteReview(req, res, next){
        try{
            const {Name} = req.params;

            const delReview = await reviewService.delete(Name);

            return res.json(delReview);
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new ReviewController();