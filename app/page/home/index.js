module.exports = {
	stylt: require("./todo.css"),
    template: require("./template.html"),
    data: {
		todos:[],
    	newTodo:'',
    	editedTodo:null,
    	visibility:'all',
    	filters:1
    },
    computed:{
    	X_Todos: function(){
    		if(this.filters==1){
                return this.todos;
    		}else if(this.filters==2){
    			return this.todos.filter(function(todo){return !todo.completed;});
    		}else if(this.filters==3){
    			return this.todos.filter(function(todo){return todo.completed;});
    		}
    	},
    	remaining: function(){
    		return this.todos.filter(function(todo){return !todo.completed;}).length;
    	}
    },
    methods:{
    	addTodo: function(){
    		var value = this.newTodo && this.newTodo.trim();
    		if(!value){
    			return;
    		}
    		this.todos.push({title:value, completed:false});

            $$.key("todos",this.todos);
    		this.newTodo='';
    	},
    	removeTodo: function(todo){
    		this.todos.$remove(todo);
            $$.key("todos",this.todos);
    	},
    	editTodo: function(todo){
    		this.beforeEditCache = todo.title;
    		this.editedTodo = todo;
    	},
    	doneEdit: function(todo){
    		if(!this.editedTodo){
    			return;
    		}
    		this.editedTodo = null;
    		todo.title = todo.title.trim();
    		if(!todo.title){
    			this.removeTodo(todo);
    		}
            $$.key("todos",this.todos);
    	},
    	removeCompleted: function(){
    		this.todos = this.todos.filter(function(todo){return !todo.completed;});
    	},
    	all: function(){
    		this.filters=1;
    	},
    	active: function(){
    		this.filters=2;
    	},
    	completedo: function(){
    		this.filters=3;
    	},
        allDone: function(){
            if(toggle_all.checked==true){
                for(var i=0;i<this.todos.length;i++){
                    this.todos[i].completed = true;

                }
            }else{
                for(var i=0;i<this.todos.length;i++){
                    this.todos[i].completed = false;
                }
            }
        },
        completeder: function(todo){
                console.log("todo");
                console.log(todo);
                console.log("todo.completed"+todo.completed);
                todo.completed = !todo.completed;
        }
    },
  
    directives: {
    	'todo-focus': function(value){
    		if(!value){
    			return;
    		}
    		var el = this.el;
    		Vue.nextTick(function(){
    			el.focus();
    		});
    	}
    },

    events: {
        "hook:ready":function() {
            if($$.key("todos")) {
                this.todos = $$.key("todos");
            }
        }
    }
}
