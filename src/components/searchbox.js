import React, { useState } from 'react'
import { Paper, InputBase, IconButton } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const APIkey = 42661839
const NASA_API_KEY = 'agjPsY92w1g44kesDUJa7XJQvj3m0GLtLcNvcvU5'
const NASA_ENDPOINT = 'https://images-api.nasa.gov/'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}))

export default function SearchBox({ onSearch, onLoad, ...props }) {
	const classes = useStyles(props)

	const [searchTerm, setSearchTerm] = useState('')

	const getImagesOnly = (images) => {
		let listOfImages = []
		if (images) {
			images.forEach((image) => {
				if (listOfImages.length < 7) {
					if (image.data[0].media_type === 'image') {
						listOfImages.push(image)
					}
				} else {
					return listOfImages
				}
			})
		}
		return listOfImages
	}

	const handleChange = (event) => {
		setSearchTerm(event.target.value)
	}

	const submit = (event) => {
		event.preventDefault()
		onLoad(true)
		let trimSearch = searchTerm.trim()
		setSearchTerm(trimSearch)
		sleep(1000).then(() =>
			fetch(`${NASA_ENDPOINT}/search?q=${searchTerm}`)
				.then((resp) => resp.json())
				.then((response) => {
					if (response.collection) {
						onLoad(false)
						onSearch(getImagesOnly(response.collection.items))
					} else {
						onLoad(false)
						onSearch([])
					}
				})
				.catch((error) => {
					console.log(error)
				})
		)
	}

	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	return (
		<form onSubmit={submit}>
			<Paper className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder='Search for an image'
					onChange={handleChange}
				/>
				<IconButton
					className={classes.iconButton}
					type='submit'
					aria-label='search'
				>
					<Search />
				</IconButton>
			</Paper>
		</form>
	)
}
