import React, { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import styles from "./CustomEditor.styles";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import KhongDau from "khong-dau";
import { styleMap, toolbarItems } from "./../../utils/editorConfigure";

const initialData = {
  blocks: [],
  entityMap: {},
};

class CustomEditorPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(initialData)),
      title: "",
      slug: "",
      description: "",
      editSlug: false,
    };

    this.focus = () => this.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  onClickEditor = () => {
    this.focus();
  };

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  toggleToolbar = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),
    );
  };

  handleChangeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === "slug") {
      return this.setState({ editSlug: true });
    }

    if (!this.state.editSlug) {
      return setTimeout(() => {
        this.setState({
          slug: KhongDau(this.state.title)
            .toLowerCase()
            .trim()
            .replace(/ /g, "-"),
        });
      }, 1000);
    }
  };

  render() {
    const { title, slug, description, editorState } = this.state;
    const { classes, readOnly, data } = this.props;
    // Make sure we're not on the ssr
    if (typeof window !== "undefined") {
      // Let's stick the toolbar to the selection
      // when the window is resized
      window.addEventListener("resize", this.checkSelectedText);
    }

    const toolbarStyle = {
      display: "block",
      backgroundColor: "black",
      color: "white",
      padding: 10,
    };

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.handleSubmit(
            title,
            slug,
            description,
            convertToRaw(editorState.getCurrentContent()),
          );
        }}
      >
        {this.props.readOnly ? null : (
          <>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
              type="submit"
            >
              {"Create new"}
            </Button>
            <Typography variant="h5">{"Title:"}</Typography>
            <FormControl
              variant="filled"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel htmlFor="title">{"Title"}</InputLabel>
              <FilledInput
                id="title"
                value={this.state.title}
                onChange={this.handleChangeInput}
                name="title"
              />
            </FormControl>

            <Typography variant="h5">{"Slug:"}</Typography>
            <FormControl
              variant="filled"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel htmlFor="slug">{"Slug"}</InputLabel>
              <FilledInput
                id="slug"
                value={this.state.slug}
                onChange={this.handleChangeInput}
                name="slug"
              />
            </FormControl>

            <Typography variant="h5">{"Description:"}</Typography>
            <TextareaAutosize
              aria-label="Description"
              minRows={5}
              placeholder="Description"
              className={classes.textArea}
              value={this.state.description}
              name="description"
              onChange={this.handleChangeInput}
            />

            <Typography variant="h5">{"Content:"}</Typography>
            <div style={toolbarStyle}>
              <ToolBar
                editorState={editorState}
                onToggle={this.toggleToolbar}
              />
            </div>
          </>
        )}

        <div
          onClick={this.onClickEditor}
          onBlur={this.checkSelectedText}
          className={classes.editor}
        >
          <Editor
            customStyleMap={styleMap}
            editorState={
              readOnly
                ? EditorState.createWithContent(convertFromRaw(data))
                : editorState
            }
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            editorKey="foobar"
            spellCheck={false}
            ref={(element) => {
              this.editor = element;
            }}
            readOnly={readOnly}
          />
        </div>
      </form>
    );
  }
}

CustomEditorPresentation.propTypes = {
  handleSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  data: PropTypes.object,
};

export default withStyles(styles)(CustomEditorPresentation);

class ToolbarButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    const buttonStyle = {
      padding: 10,
    };
    return (
      <span onMouseDown={this.onToggle} style={buttonStyle}>
        {this.props.label}
      </span>
    );
  }
}

const ToolBar = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div>
      {toolbarItems.map((toolbarItem) => (
        <ToolbarButton
          key={toolbarItem.label}
          active={currentStyle.has(toolbarItem.style)}
          label={toolbarItem.label}
          onToggle={props.onToggle}
          style={toolbarItem.style}
        />
      ))}
    </div>
  );
};
