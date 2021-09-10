import React, { useState } from 'react'
import {
	Box,
	Card,
	CardContent,
	Button,
	Typography,
	IconButton,
	Link,
	FormControl,
	MenuItem,
	InputLabel,
	Select,
	CardHeader,
	CardMedia,
	CardActions,
	Collapse,
	Chip,
} from '@material-ui/core'
import clsx from 'clsx'
import { FavoriteOutlined } from '@material-ui/icons'
import Loading from '../images/loading.gif'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	title: {
		width: '100%',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	formControl: {
		margin: theme.spacing(1),
		width: 80,
	},
	formSelect: {
		height: 40,
	},
	resultRoot: {
		margin: theme.spacing(1),
		justifyContent: 'space-between',
		width: '95%',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: '100%',
	},
	tags: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
			marginBottom: theme.spacing(0),
		},
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	content: {
		flex: '1 0 auto',
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingRight: theme.spacing(1),
	},
	addIcon: {
		height: 30,
		width: 30,
	},
	loading: {
		height: 70,
		width: 70,
	},
	loadingCard: {
		display: 'flex',
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		justifyContent: 'center',
		width: '95%',
	},
	limitCard: {
		display: 'flex',
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '95%',
		textAlign: 'center',
	},
	submitButton: {
		backgroundColor: '#5da2d5',
		'&:hover': {
			backgroundColor: '#90ccf4',
		},
	},
	likeButton: {
		color: '#e59892',
	},
}))

const _renderResults = (
	images,
	addNomination,
	checkIfIDExists,
	loading,
	max,
	onSubmit
) => {
	const classes = useStyles()

	if (loading) {
		return (
			<Card className={classes.loadingCard}>
				<img className={classes.loading} src={Loading} />
			</Card>
		)
	} else if (images.length < 1) {
		return <Card className={classes.loadingCard}>No results were found</Card>
	} else if (images[0] === 0) {
		return (
			<Card className={classes.loadingCard}>
				Need inspiration? Try searching 'Star Wars'
			</Card>
		)
	} else {
		return images.map(
			(image, i) =>
				i < max && (
					<Card className={classes.resultRoot} key={i}>
						<CardHeader
							title={image.data[0].title}
							subheader={
								`Date created: ` + image.data[0].date_created.substring(0, 10)
							}
							action={
								<IconButton
									disabled={checkIfIDExists(image)}
									onClick={() => addNomination(image)}
								>
									<FavoriteOutlined
										className={
											checkIfIDExists(image) ? null : classes.likeButton
										}
									/>
								</IconButton>
							}
						/>
						<CardMedia className={classes.media} image={image.links[0].href} />
						<CardContent>
							<Typography
								variant='body2'
								color='textPrimary'
								component='p'
								paragraph
							>
								<Link
									color='inherit'
									onClick={() => window.open(image.links[0].href)}
								>
									Click for full-size image
								</Link>
							</Typography>
							{image.data[0].location ? (
								<Typography
									variant='body1'
									color='textPrimary'
									component='p'
									paragraph
								>
									<b>Location:</b> {image.data[0].location}
								</Typography>
							) : null}
							{image.data[0].photographer ? (
								<Typography
									variant='body1'
									color='textPrimary'
									component='p'
									paragraph
								>
									<b>Photographer:</b> {image.data[0].photographer}
								</Typography>
							) : null}
							{image.data[0].description_508 ? (
								<Typography
									variant='body1'
									color='textPrimary'
									component='p'
									paragraph
								>
									<b>Description:</b> {image.data[0].description_508}
								</Typography>
							) : null}

							{image.data[0].keywords ? (
								<Typography
									variant='body1'
									color='textPrimary'
									component='p'
									paragraph
								>
									<Box className={classes.tags}>
										<Box pt={0.5}>
											<b>Tags:</b>
										</Box>
										{image.data[0].keywords.map((keyword) => (
											<Chip label={keyword} />
										))}
									</Box>
								</Typography>
							) : null}
						</CardContent>
					</Card>
				)
		)
	}
}

export default function Results({
	images,
	onAdd,
	checkIfIDExists,
	loading,
	searchTerm,
	onSubmit,
	...props
}) {
	const classes = useStyles(props)

	const [max, setMax] = React.useState(3)

	const handleChange = (event) => {
		setMax(event.target.value)
	}

	const addNomination = (image) => {
		onAdd(image)
	}

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<Box className={classes.title}>
				<Typography variant='h6'>Results</Typography>
				<FormControl variant='outlined' className={classes.formControl}>
					<InputLabel>Max</InputLabel>
					<Select
						value={max}
						onChange={handleChange}
						label='Max'
						className={classes.formSelect}
					>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={7}>7</MenuItem>
					</Select>
				</FormControl>
			</Box>
			{images &&
				_renderResults(
					images,
					addNomination,
					checkIfIDExists,
					loading,
					max,
					onSubmit
				)}
		</Box>
	)
}
