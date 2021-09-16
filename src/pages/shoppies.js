import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchBox from '../components/searchbox'
import Likes from '../components/likes'
import Results from '../components/results'
import {
	Container,
	Box,
	Grid,
	Typography,
	Modal,
	Backdrop,
	Fade,
	Snackbar,
	SnackbarContent,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(4),
	},
	title: {
		position: 'relative',
		marginTop: theme.spacing(2),
		textAlign: 'center',
		color: 'black',
		[theme.breakpoints.up('md')]: {
			textAlign: 'left',
		},
	},
	searchContainer: {
		marginTop: theme.spacing(2),
		boxShadow:
			'0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
		position: 'relative',
		height: 125,
		width: '100%',
		backgroundColor: '#212121',
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 6,
		[theme.breakpoints.up('md')]: {
			height: 120,
		},
	},
	searchBox: {
		position: 'absolute',
		top: 100,
		width: '90%',
		[theme.breakpoints.up('md')]: {
			width: '80%',
			top: 96,
		},
	},
	resultsContainer: {
		marginTop: theme.spacing(5),
		borderRadius: 6,
		width: '100%',
		backgroundColor: '#e59892',
	},
	likesContainer: {
		borderRadius: 6,
		width: '100%',
		backgroundColor: '#e59892',
		marginTop: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing(2),
			marginTop: theme.spacing(9),
		},
	},
	mainContainer: {
		minHeight: '100%',
		display: 'block',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: 6,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	popUp: {
		marginBottom: theme.spacing(1),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}))

export default function Shoppies({ ...props }) {
	const classes = useStyles(props)

	const [images, setImages] = useState([])
	const [likes, setLikes] = useState([])
	const [loading, setLoading] = useState(false)
	const [saveForLater, setSaveForLater] = useState(false)

	const checkIfIDExists = (image) => {
		return likes.some((item) => item.data[0].nasa_id === image.data[0].nasa_id)
	}

	const addLike = (movie) => {
		if (!checkIfIDExists(movie)) {
			setLikes(likes.concat(movie))
		}
	}

	const removeLike = (image) => {
		if (likes.length == 1) {
			setLikes(
				likes.filter((item) => item.data[0].nasa_id !== image.data[0].nasa_id)
			)
			window.localStorage.clear()
		} else {
			setLikes(
				likes.filter((item) => item.data[0].nasa_id !== image.data[0].nasa_id)
			)
		}
	}

	useEffect(() => {
		if (images.length > 0) {
			window.localStorage.setItem('likes', JSON.stringify(likes))
			setSaveForLater(false)
		}
	}, [saveForLater])

	useEffect(() => {
		if (window.localStorage.getItem('likes')) {
			setLikes(JSON.parse(window.localStorage.getItem('likes')))
		}
		setImages([0])
	}, [])

	return (
		<Container maxWidth='md' className={classes.root}>
			<Grid container>
				<Grid item container xs={12} md={6} className={classes.mainContainer}>
					<Grid item xs={12} className={classes.title}>
						<Typography variant='h4'>NASA Image Library</Typography>
					</Grid>
					<Grid item xs={12} className={classes.searchContainer}>
						<Box
							pt={1}
							display='flex'
							flexDirection='column'
							alignItems='center'
						>
							<Box maxWidth='85%' textAlign='center' pt={2} color='white'>
								<Typography variant='subtitle1'>
									<b>Tip: </b>Search and like your favourite images from NASA's
									library.
								</Typography>
							</Box>
						</Box>
						<Box className={classes.searchBox}>
							<SearchBox onSearch={setImages} onLoad={setLoading} />
						</Box>
					</Grid>
					<Grid item xs={12} className={classes.resultsContainer}>
						<Results
							images={images}
							onAdd={addLike}
							checkIfIDExists={checkIfIDExists}
							loading={loading}
						/>
					</Grid>
				</Grid>
				<Grid item container xs={12} md={6}>
					<Grid item xs={12}>
						<Box className={classes.likesContainer}>
							<Likes
								onRemove={removeLike}
								images={likes}
								setSaveForLater={setSaveForLater}
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}
