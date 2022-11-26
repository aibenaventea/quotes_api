const Author = require('../model/author');

const authorsPost = (req, resp) => {

    const { name, quotes } = req.body;

    const author = new Author();
    author.name = name;
    author.quotes = quotes;

    author.save()
        .then(_author => resp.status(201).json({ message: "Success", _author }))
        .catch(error => {
            console.log('error', JSON.stringify(error));
            resp.status(500).json({ message: "Fail", error })
        });

}

const authorsGet = (req, resp) => {

    Author.find()
        .then(authors => resp.status(200).json({ message: "Success", authors }))
        .catch(error => resp.status(500).json({ message: "Fail", error }));

}

const authorGet = (req, resp) => {

    const { id } = req.params;

    Author.findById(id)
        .then(author => {
            if (author) {
                resp.status(200).json({ message: "Success", author });
            } else {
                resp.status(404).json({ message: "Not found" });
            }
        })
        .catch(error => resp.status(500).json({ message: "Fail", error }));

}

const authorsPut = (req, resp) => {

    const { id } = req.params;
    const { name } = req.body;

    Author.findByIdAndUpdate(id, { name: name }, { new: true, runValidators: true })
        .then(author => resp.status(200).json({ message: "Success", author }))
        .catch(error => {
            resp.status(500).json({ message: "Fail", error })
        });

}

const authorsDelete = (req, resp) => {

    const { id } = req.params;

    Author.findByIdAndDelete(id)
        .then((author) => {
            if (author) {
                resp.status(200).json({ message: "Success", author });
            } else {
                resp.status(404).json({ message: "Not found" });
            }
        })
        .catch(error => resp.status(500).json({ message: "Fail", error }));

}

const quotesPost = (req, resp) => {

    const { id } = req.params;
    const { quote } = req.body;

    const _quote = {
        quote: quote
    }

    if(quote) {

        Author.findByIdAndUpdate(id, { $push: { quotes: _quote } }, { new: true, runValidators: true })
            .then(author => {
                if (author) {
                    resp.status(200).json({ message: "Success", author })
                } else {
                    resp.status(404).json({ message: "Not found" })
                }
            })
            .catch(error => resp.status(500).json({ message: "Fail", error }));

    } else {

        error = {
            "errors": {
                "quote": {
                    "name": "ValidatorError",
                    "message": "quote required",
                    "properties": {
                        "message": "quote required",
                        "type": "required",
                        "path": "quote",
                        "value": ""
                    },
                    "kind": "required",
                    "path": "quote",
                    "value": ""
                }
            },
            "_message": "Quote validation failed",
            "name": "ValidationError",
            "message": "Quote validation failed: quote: quote required"
        }

        resp.status(400).json({ message: "Success", error: error });

    }


}

const quotesPut = async (req, resp) => {

    try {

        const { quoteId } = req.params;
        const { vote } = req.body;

        const result = await Author.updateOne({
            'quotes._id': quoteId
        }, {
            $set: {
                'quotes.$.vote': vote
            }
        })

        if (result?.acknowledged) {
            resp.status(200).json({ message: "Success", result });
        } else {
            resp.status(404).json({ message: "Not found" });
        }

    } catch (error) {
        resp.status(500).json({ message: "Fail", error });
    }

}

const quotesDelete = (req, resp) => {

    const { id, quoteId } = req.params;

    Author.findByIdAndUpdate(id, {
        $pull: {
            quotes: {
                _id: quoteId
            }
        }
    }).
        then(author => resp.status(200).json({ message: "Success", author }))
        .catch(error => resp.status(500).json({ message: "Fail", error }));

}

const notFound = (req, resp) => {
    console.log('url', req.url);
    resp.status(404).json('not found');
}

module.exports = {
    authorsPost,
    authorsGet,
    authorGet,
    authorsPut,
    authorsDelete,
    quotesPost,
    quotesPut,
    quotesDelete,
    notFound
}